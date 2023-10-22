"use client"

import Link from "next/link"
import {Book } from "@/app/types"
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
			<Navigation />
			<div>AiBooks</div>
			{data?.map((book, i) => (
				<div key={i}>
					<h2>{book.title}</h2>
					<p>{book.description}</p>
					<Link href={"ai-books" + `/${book.title.split(" ").join("-")}`}>read book</Link>
				</div>
			))}
		</>
	)
}
