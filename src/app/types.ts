export interface Book {
	id: number
	title: string
	author: string
	description: string
	genre: string
	publish_date: string
	book_cover_img: string
	chapters: {
		heading: string
		content: string
		chapter_img: string
	}[]
}

