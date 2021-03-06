import styled, { css } from 'styled-components';

export const SearchBarContainer = styled.div`
  max-width: 1032px;
  width: 100%;
  #dimmer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SearchBarWrapper = styled.div`
  @font-face {
    font-family: "NanumSquareRegular";
    src: url(../../../lib/fonts/NanumSquareRegular.ttf) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareBold";
    src: url(../../../lib/fonts/NanumSquareBold.ttf) format("truetype");
  }
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 582px;
  max-height: 439px;
  overflow-y: scroll;

  /* hide scroll bar */
  /* -webkit- (Chrome, Safari, newer versions of Opera) */
  &::-webkit-scrollbar { width: 0 !important }
  /* Firefox */
  scrollbar-width: none;
  /* -ms- (Internet Explorer +10) */
  -ms-overflow-style: none;

  background-color: ${props => (props.transparent && !props.searchFocused
    ? 'transparent' : 'white')};
  /* background-color: white; */
  border-radius: 4px;

  .divider {
    margin: 0 6px;
    position: relative;
    border: .5px solid #E9E9E9;
  }
  @media (max-width: 910px) {
    width: 100%;
    ${props => (props.type === 'search' && css`
      width: 180px;
      float: right;
      margin-right: 12px; 
    `)}
  }
  ${props => (props.searchFocused ? css`
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);

    @media (max-width: 910px) {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
  ` : css`
  `)}
`;

SearchBarWrapper.Header = styled.div`
  height: 38px;
  position: relative;
  top: 0;

  img {
    position: absolute;
    display: block;
    align-self: center;
    &.search-icon {
      top: 12px;
      left: 16px;
      height: 16px;
    }
    &.cancel-icon {
      top: 7px;
      right: 12px;
      height: 24px;
    }
  }
  @media (max-width: 910px) {
    img.search-icon {
      ${props => (props.searchFocused || props.type === 'search' ? css`
        top: 12px;
        left: 16px;
        right: auto;
      ` : css`
      top: 10px;
      right: 12px;
      left: auto;
      `)}
    }
  }
`;

SearchBarWrapper.Header.SearchBar = styled.div`
  input {
    display: inline-block;
    width: 100%;
    padding: 10px 48px;
    font-size: 16px;
    line-height: 18px;
    color: #202020;
    border: 0;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #BCBCBC;
    }
    ${props => (props.transparent && !props.searchFocused ? css`
      background: rgba(255, 255, 255, 0.15);
      @media (max-width: 910px) { display: none }
    ` : props.searchFocused ? css`
      border-radius: 0;
      background-color: white;
    ` : css`
      border-radius: 4px;
      background-color: #F4F4F4;
      @media (max-width: 910px) { display: none }
    `)}
    ${props => (props.type === 'search' && css`
      @media (max-width: 910px) { display: inline-block }
    `)}
  }
`;

SearchBarWrapper.Body = styled.div`
  position: relative;
  ${props => (props.searchFocused ? css`` : css`
    display: none;
  `)}
  ${props => (
    !props.search ? css`
      padding: 36px 16px;
    ` : props.isResultsEmpty ? css`
          padding: 0 16px;
        ` : css`
          padding: 24px 16px;
        `
  )}

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #8F8F8F;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0 0 24px 0;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      margin: 0 -16px;
      padding: 0 16px;
      &:hover, &:focus {
        background-color: #F4F4F4;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
      }
      a {
        line-height: 40px;
        width: 100%;
      }
    }
  }
`;
