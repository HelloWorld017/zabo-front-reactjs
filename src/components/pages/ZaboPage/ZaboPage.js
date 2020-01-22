import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import throttle from 'lodash.throttle';

import ZaboList from 'templates/ZaboList';
import Header from 'templates/Header';
import Carousel from 'react-airbnb-carousel';

import { ZaboPageWrapper } from './ZaboPage.styled';
import { ZaboType } from '../../../lib/propTypes';
import { to2Digits } from '../../../lib/utils';
import { pinZabo, likeZabo } from '../../../store/reducers/zabo';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import likeImg from '../../../static/images/like.png';
import emptyLikeImg from '../../../static/images/emptyLike.png';
import bookmarkImg from '../../../static/images/bookmark.png';
import emptyBookmarkImg from '../../../static/images/emptyBookmark.png';

const StatsBox = ({
  num, isBookmark, zaboId, isLiked, isPinned,
}) => {
  // isBookmark : type number ( 0 == falsy )
  const pinSrc = isPinned ? bookmarkImg : emptyBookmarkImg;
  const likeSrc = isLiked ? likeImg : emptyLikeImg;
  const src = isBookmark ? pinSrc : likeSrc;

  const dispatch = useDispatch ();
  const throttledLike = useMemo (() => throttle (() => dispatch (likeZabo (zaboId))
    .catch (err => console.log (err)), 200), [dispatch]);

  const throttledPin = useMemo (() => throttle (() => dispatch (pinZabo (zaboId))
    .catch (err => console.log (err)), 200), [dispatch]);

  const onClick = e => {
    e.preventDefault ();
    isBookmark ? throttledPin () : throttledLike ();
  };

  return (
    <ZaboPageWrapper.Info.Box onClick={onClick}>
      <img src={src} alt="icon image" />
      <div>{num}</div>
    </ZaboPageWrapper.Info.Box>
  );
};

const ZaboPage = (props) => {
  const liked = 263;
  const booked = 263;
  const statsList = [liked, booked];

  const { zabo, zaboId } = props;
  const {
    title, owner, endAt, createdAt, description, category = [], photos = [{}], isLiked, isPinned, views = 0,
  } = zabo;

  const curMoment = moment ();
  const createdAtMoment = moment (createdAt);
  const minDiff = curMoment.diff (createdAtMoment, 'minutes');
  const hourDiff = curMoment.diff (createdAtMoment, 'hours');
  const daysDiff = curMoment.diff (createdAtMoment, 'days');
  const monthDiff = curMoment.diff (createdAtMoment, 'months');
  const due = moment (endAt).diff (curMoment, 'days');

  return (
    <ZaboPageWrapper>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <ZaboPageWrapper.TwoCol>
        <ZaboPageWrapper.TitleImage>
          <Carousel imageUrls={photos.map (({ url }) => url)} ratio={photos[0].width / photos[0].height} />
        </ZaboPageWrapper.TitleImage>
        <ZaboPageWrapper.Info>
          <ZaboPageWrapper.Info.Header>
            <section>
              <ul className="keyword-result">
                {category.map (cat => (
                  <li key={cat}>#{cat}</li>
                ))}
              </ul>
            </section>
            <section>
              <h1>{title}</h1>
              {due > 0 && <div className="due-date">D{to2Digits (-due, true)}</div>}
            </section>
            <section>
              <div className="details">
                {minDiff < 60 ? `${minDiff} minutes...`
                  : hourDiff < 24 ? `${hourDiff} hours...`
                    : daysDiff < 30 ? `${daysDiff} days ...`
                      : monthDiff}
              </div>
              <div className="specialChar">&middot;</div>
              <div className="details">조회수 {views}</div>
            </section>
            <section className="statSection">
              {statsList.map ((elem, idx) => <StatsBox key={idx} num={elem} isBookmark={idx} zaboId={zaboId} isLiked={isLiked} isPinned={isPinned} />)}
            </section>
          </ZaboPageWrapper.Info.Header>
          <ZaboPageWrapper.Info.Body>
            <section>
              <div className="borderLine"> </div>
              <div className="owner">
                {
                  owner && ('profilePhoto' in owner)
                    ? <img src={owner.profilePhoto} alt="group profile photo" />
                    : <img src={groupDefaultProfile} alt="default profile img" />
                }
                <p>{owner ? owner.name : 'annoymous'}</p>
                <div className="specialChar">&middot;</div>
                <p className="follow">팔로잉</p>
              </div>
              <div className="borderLine"> </div>
            </section>
            <section className="contents">
              {description}
            </section>
          </ZaboPageWrapper.Info.Body>
        </ZaboPageWrapper.Info>
      </ZaboPageWrapper.TwoCol>
      <ZaboPageWrapper.Recommend>
        <h1>연관 있는 자보</h1>
        <ZaboList type="related" relatedTo={zaboId} key={zaboId} />
      </ZaboPageWrapper.Recommend>
    </ZaboPageWrapper>
  );
};

ZaboPage.propTypes = {
  zabo: PropTypes.shape (ZaboType).isRequired,
  zaboId: PropTypes.string.isRequired,
};

ZaboPage.defaultProps = {
};

export default ZaboPage;
