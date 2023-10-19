export interface Book {
	title: string
	author: string
	description: string
	chapters: {
		heading: string
		paragraphs: string[]
	}[]
}

