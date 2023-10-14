import {Suite, expect} from "cynic"

import {setup_api} from "./setup_api"

const api = await setup_api("http://localhost:8000")

export default <Suite>{
  "we can list books": {
		"ten books are returned by default": async() => {
			const books = await api.list_books()
			expect(books?.length)
				.equals(10)
  	},
	},
}
