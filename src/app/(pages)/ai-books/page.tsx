"use client"

import Link from "next/link"
import Image from "next/image"
import {Book} from "@/app/types"
import styles from "./style.module.css"
import {Search} from "./tools/Search/search"
import {get_books} from "@/app/api/get_books"
import {useQuery} from "@tanstack/react-query"
import {useEffect, useMemo, useState} from "react"
import Navigation from "@/app/components/navigation/component"
import searchIcon from "@/app/icons/material-design-icons/search.svg"

export default function AIBooks() {
	const { data } = useQuery<Book[]>({
		queryKey: ["books"],
		queryFn: () => get_books(),
		staleTime: 5 * 1000,
	})

	const [searchResult, setSearchResult] = useState(data)
	const search = useMemo(() => new Search(data!), [data!])
	useEffect(() => setSearchResult(data), [data])
	
	const search_query = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter") {
			const searchResult = search.query({text: e.currentTarget.value, sort: "newest"})
			setSearchResult(searchResult)
		}
	}

	return (
		<>
			<Navigation />
			<div className={styles.books}>
				<div className={styles.searchBar}>
					<Image
						src={searchIcon}
						alt="search icon"
						className={styles.searchIcon}
						width={30}
						height={25}
					/>
					<input onKeyDown={search_query} className={styles.searchInput} />
				</div>
				{searchResult?.map((book, i) => (
					<div className={styles.book} key={i}>
						<h2 className={styles.title}>{book.title}</h2>
						<div className={styles.bookCover}>
							<Image className={styles.bookCoverImg} alt="book cover" width={200} height={250} src={`${process.env.basePath}/book-cover.png`}/>
							<Link className={styles.read} href={`ai-books/${book.title.split(" ").join("-")}`}>
								Read
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
