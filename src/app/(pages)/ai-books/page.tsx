"use client"

import Link from "next/link"
import Image from "next/image"
import {Book} from "@/app/types"
import styles from "./style.module.css"
import {get_books} from "@/app/api/get_books"
import {useQuery} from "@tanstack/react-query"
import Navigation from "@/app/components/navigation/component"

export default function AIBooks() {
	const { data } = useQuery<Book[]>({
		queryKey: ["books"],
		queryFn: () => get_books(),
		staleTime: 5 * 1000,
	})

	return (
		<>
			<h1 className={styles.mainHeading}>Schriftsteller</h1>
			<Navigation />
			<h2 className={styles.routeHeading}>AIBOOKS</h2>
			<div className={styles.books}>
				{data?.map((book, i) => (
					<div className={styles.book} key={i}>
						<h2>{book.title}</h2>
						<Image alt="book cover" width={200} height={250} src="/book-cover.png"/>
						<Link href={`ai-books/${book.title.split(" ").join("-")}`}>
							read book
						</Link>
					</div>
				))}
			</div>
		</>
	)
}
