
import {turtle_script} from "@benev/turtle"

// import the partial from the previous example
import bookpageHtml from "./bookpage.html.js"
// we'll stamp out a webpage for each of these values
const values = [1, 2]

// your default export must be a turtle_script
export default turtle_script(async({write_webpage}) => {

	// loop over each value
	await Promise.all(values.map(async(x) => {

		// write a webpage
		await write_webpage({

			// provide the page template
			template: bookpageHtml,

			// provide the x value in the context
			context: x,

			// specify the destination relative
			// to this build script
			destination: `/frontend/pages/ai-books/${x}.html`,
		})
	}))
})
