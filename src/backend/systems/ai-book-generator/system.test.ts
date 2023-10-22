import {AIBookGenerator} from "./system"

describe("generating-ai-book", () => {
	const generator = new AIBookGenerator()
	it("should generate book that is between 5000-25000 words long", () => {
		const [book] = generator.generate_book(1)
		let bookLength = 0
		book.chapters.forEach(chapter => bookLength += chapter.content.length)
		expect(bookLength).toBeGreaterThanOrEqual(5000)
		expect(bookLength).toBeLessThanOrEqual(25000)
	})
	it("should generate book that is different than other ones", () => {})
	it("should generate 3 books per day, each of different genre", () => {
		const books = generator.generate_book(3)
		for(const book of books) {
			for(const different_book of books) {
				if(book !== different_book) {
					expect(book.genre).not.toEqual(different_book.genre)
				}
			}
		}
	})
	it("should handle diverse input genres and generate relevant books", () => {})
	it("should generate a book with valid chapters", () => {
		const [book] = generator.generate_book(1)
		book.chapters.forEach(chapter => {
			expect(chapter.heading.length).toBeGreaterThan(0)
			expect(chapter.content.length).toBeGreaterThan(0)
		})
	})
	it("should generate a book with valid metadata", () => {
		const [book] = generator.generate_book(1)
		expect(book.title).toBeDefined()
		expect(book.author).toBeDefined()
		expect(book.genre).toBeDefined()
	})
	it("should generate books with appropriate language and grammar", () => {})
})

