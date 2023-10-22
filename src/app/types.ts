export interface Book {
	id: number
	title: string
	author: string
	description: string
	chapters: {
		heading: string
		content: string
	}[]
}

