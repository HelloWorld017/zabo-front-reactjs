import React from "react"
import { storiesOf } from "@storybook/react"

import ZaboUpload from "./index"

storiesOf("pages/ZaboUploadPage", module).add(
	"Default",
	() => (
		<ZaboUpload />
	), {
		notes: ""
	}
)
