import Link from "next/link"
import Image from "next/image"
import {Book} from "@/app/types"
import styles from "./style.module.css"
import books from "../../../../../public/books.json"

export default async function BookPage({
	params: {title}
}: {
	params: {title: string, chapter: string}})
{
	const data = books
	const book = data.find(book => book.title === title.split("-").join(" "))
	return (
		<>
			<div>
				<h1 className={styles.title}>
					{book?.title.toUpperCase()}
					<p className={styles.description}>{book?.description}</p>
				</h1>
				<h2 className={styles.chaptersHeading}>Chapters</h2>
				<div className={styles.chapters}>
					{book?.chapters.map(chapter =>
						<div className={styles.perspective}>
							<div className={styles.bookCover}>
								<Link className={styles.link} href={`${book.title.split(" ").join("-")}/${chapter.heading.split(" ").join("-")}`}>
									<span>{chapter.heading}</span>
								</Link>
								<Image className={styles.bgImage} alt="book cover" width={400} height={450} src={`${process.env.basePath}/book-cover.png`} />
							</div>
						</div>
						)}
				</div>
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

