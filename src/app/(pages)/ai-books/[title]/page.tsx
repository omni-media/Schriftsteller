import {Book} from "@/app/types"
import books from "../../../../../public/books.json"

export default async function BookPage({params: {title}}: {params: Book}) {
	const data = books
	const book = data.find(book => book.title === title.split("-").join(" "))
	return (
		<>
				<div>
					<h2>{book?.id}</h2>
					<h2>{book?.title}</h2>
					<p>{book?.chapters.content}</p>
				</div>
		</>
	)
}


export async function generateStaticParams() {
	//const books = await getBooks()
	return books.map(book => ({
		title: book.title.split(" ").join("-")
	}))
}
 
async function getBooks() {
	const res = await fetch(`books.json`)
	const post = await res.json()
 
	return post as Book[]
}

