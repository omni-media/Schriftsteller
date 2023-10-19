export async function setup_api(url: string) {

	console.log(url)
	const parser = new DOMParser()

	return {
		async list_books() {
			try {
				const books_page = await fetch(`${url}/ai-books`)
				const books_page_text = await books_page.text()
				const books_page_doc = parser.parseFromString(books_page_text, "text/html")
				const books_list = books_page_doc.querySelectorAll(".book")
				return books_list
			} catch(error) {
					console.log(error)
			}
		}
	}
}
