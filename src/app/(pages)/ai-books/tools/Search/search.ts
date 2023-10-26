import Fuse from 'fuse.js'
import {Book} from "@/app/types"

export class Search {
	#manifest: Book[]
	#fuzzy: Fuse<Book>

	constructor(manifest: Book[]) {
		this.#manifest = manifest
		this.#fuzzy = new Fuse(manifest, {keys: ["title"]})
	}

	query({text, sort}: {text: string, sort: SortBy}) {
		const search_result = this.#search(text)
		return this.#sort(search_result, sort)
	}

	#search(text: string) {
		if(text.split(" ").length >= 10) {return []}
		if(text === "") {return this.#manifest}
		else {return this.#fuzzy.search(text).map(fs => fs.item)}
	}

	#sort(search_result: Book[], sort: SortBy) {
		switch(sort) {
			case "newest":
				return search_result.sort((a, b) => {
					if(new Date(a.publish_date).getTime() > new Date(b.publish_date).getTime()) {
						return -1
					} else return 1
				})
			case "oldest":
				return search_result.sort((a, b) => {
					if(new Date(a.publish_date).getTime() > new Date(b.publish_date).getTime()) {return 1}
						else return -1
				})
			case "longest":
				return search_result.sort((a, b) => {
					let book_a_length = 0
					let book_b_length = 0
					a.chapters.forEach(c => book_a_length += c.content.length)
					b.chapters.forEach(c => book_b_length += c.content.length)
					if(book_a_length > book_b_length) {return -1}
						else return 1
			})
			case 'shortest':
				return search_result.sort((a, b) => {
					let book_a_length = 0
					let book_b_length = 0
					a.chapters.forEach(c => book_a_length += c.content.length)
					b.chapters.forEach(c => book_b_length += c.content.length)
					if(book_a_length > book_b_length) {return 1}
						else return -1
			})
			case 'A-Z':
				return search_result.sort((a, b) => {
					if(a.title < b.title) {return -1}
					else if(a.title > b.title) {return 1}
					return 0
			})
			case 'Z-A':
				return search_result.sort((a, b) => {
					if(a.title < b.title) {return -1}
					else if(a.title > b.title) {return 1}
					return 0
			}).reverse()
		}
	}
}

export type SortBy = "newest" | "oldest" | "longest" | "shortest" | "A-Z" | "Z-A"
