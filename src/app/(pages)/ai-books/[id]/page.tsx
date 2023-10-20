import {Book} from "@/app/types"
import books from "./books.json"

export default async function BookPage({params: {id}}: {params: Book}) {
	const data = books
	const book = data.find(book => book.id === id)
	return (
		<>
			<div>AiBooks</div>
				<div>
					<h2>{book?.id}</h2>
					<h2>{book?.title}</h2>
					<p>{book?.description}</p>
					<a href="/some_book.html">read book</a>
				</div>
		</>
	)
}


export async function generateStaticParams() {
	//const books = await getBooks()
	return books
}
 
async function getBooks() {
	const res = await fetch(`books.json`)
	const post = await res.json()
 
	return post as Book[]
}

