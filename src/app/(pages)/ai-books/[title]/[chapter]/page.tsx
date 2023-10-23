import {Book} from "@/app/types"
import styles from "./style.module.css"
import books from "../../../../../../public/books.json"
export default async function ChapterPage({
	params: {title, chapter}
}: {
	params: {title: string, chapter: string}}) 
{
	console.log(chapter)
	const data = books
	const book = data.find(book => book.title === title.split("-").join(" "))
	const bookChapter = book?.chapters.find(c => c.heading.split(" ").join("-") === chapter)
	return (
		<>
			<div>
				<h2>{book?.title}</h2>
				<p>{chapter}</p>
				<p>{bookChapter?.content}</p>
			</div>
		</>
	)
}

export async function generateStaticParams() {
	//const books = await getBooks()
	const result: any = []
	books.map(book => 
		book.chapters.map(chapter => {
			result.push({
					title: book.title.split(" ").join("-"),
					chapter: chapter.heading.split(" ").join("-")
			})
		})
	)
	return result
}

async function getBooks() {
	const res = await fetch(`books.json`)
	const post = await res.json()
 
	return post as Book[]
}

