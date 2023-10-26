import {Search} from "./search"
import {Book} from "@/app/types"
import {books} from "../../../../../../public/books"

const manifest: Book[] = books

describe("Search", () => {
	it("can find a book by its title", async () => {
		const search = new Search(manifest)
		const books = search.query({text: "amazon journey", sort: "newest"})
		const [firstBook] = books
		expect(firstBook.title.includes("Amazon")).toBeTruthy()
	})
	it("returns empty array when query is too specific (max 10 words)", () => {
		const search = new Search(manifest)
		const text = `In the Heart of the Mighty Amazon: A Comprehensive Exploration of the Breathtaking Biodiversity,
			Enigmatic Indigenous Cultures, and the Urgent Call for Preservation in the World's Largest Rainforest`
		const books = search.query({text, sort: "newest"})
		expect(books).toEqual([])
	})
	it("returns ordered results according to sort params", () => {})
	it("can search for alphabetically-first books", () => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "A-Z"})
		const [firstBook] = books
		expect(firstBook.title.toUpperCase().includes("A")).toBeTruthy()
	})
	it("can search for alphabetically-last books",() => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "Z-A"})
		const [firstBook] = books
		expect(firstBook.title.toUpperCase().includes("Z")).toBeTruthy()
	})
	it("can search for longest books",() => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "longest"})
		const [firstBook, secondBook] = books
		let first_book_length = 0
		let second_book_length = 0
		firstBook.chapters.forEach(c => first_book_length += c.content.length)
		secondBook.chapters.forEach(c => second_book_length += c.content.length)
		expect(first_book_length).toBeGreaterThan(second_book_length)
	})
	it("can search for shortest books", () => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "shortest"})
		const [firstBook, ...restBooks] = books
		let first_book_length = 0
		firstBook.chapters.forEach(c => first_book_length += c.content.length)
		restBooks.forEach(book => {
			let book_length = 0
			book.chapters.forEach(c => book_length += c.content.length)
			expect(first_book_length).toBeLessThan(book_length)
		})
	})
	it("can handle partial matches", () => {
		const search = new Search(manifest)
		const books = search.query({text: "102", sort: "newest"})
		const [firstBook] = books
		expect(firstBook.title).toBe("A102B")
	})
	it("can handle minor misspellings or typos in the search query (Fuzzy Search)", () => {
		const search = new Search(manifest)
		const books = search.query({text: "amzon", sort: "newest"})
		const [firstBook] = books
		expect(firstBook.title.includes("Amazon")).toBeTruthy()
	})
	it("can search for oldest books", () => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "oldest"})
		const [firstBook, ...restBooks] = books
		restBooks.forEach(book => expect(new Date(firstBook.publish_date).getTime()).toBeLessThan(new Date(book.publish_date).getTime()))
	})
	it("can search for newest books", () => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "newest"})
		const [firstBook, ...restBooks] = books
		restBooks.forEach(book => expect(new Date(firstBook.publish_date).getTime()).toBeGreaterThan(new Date(book.publish_date).getTime()))
	})
	it("should return everything when empty search", () => {
		const search = new Search(manifest)
		const books = search.query({text: "", sort: "newest"})
		expect(books.length).toEqual(manifest.length)
	})
})
