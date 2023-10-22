export interface Book {
	id: number
	title: string
	author: string
	description: string
	genre: string
	chapters: {
		heading: string
		content: string
	}[]
}

