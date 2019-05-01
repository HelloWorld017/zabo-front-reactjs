import React from "react"
import { storiesOf } from "@storybook/react"

import Loading from "./Loading"

storiesOf("templates/Loading", module).add(
	"Default",
	() => (
		<Loading />
	), {
		notes: ""
	}
)