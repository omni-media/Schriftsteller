import {PythonShell, Options} from 'python-shell'

import {Book} from '@/app/types'

let options: Options = {
	mode: "json",
	pythonPath: 'path/to/python',
	pythonOptions: ['-u'], // get print results in real-time
	scriptPath: '../../scripts/make_book.py',
	//args: ['value1', 'value2', 'value3']
}

export class AIBookGenerator {
	generate_book(quantity: number): Book[] {
		const booksJson: any[] = []
		for(let i = 0; i < quantity; i++) {
			PythonShell.run('my_script.py', options).then(bookJson =>{
				booksJson.push(bookJson)
			})
		}
		return booksJson.map(bookJson => JSON.parse(bookJson))
	}
}
