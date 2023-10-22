import {PythonShell, Options} from 'python-shell';


let options: Options = {
  mode: "json",
  pythonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '../../scripts/make-book.py',
  //args: ['value1', 'value2', 'value3']
}

export class AIBookGenerator {
	generate_book(quantity: number) {
		const booksJson = []
		for(let i = 0; i < quantity; i++) {
			PythonShell.run('my_script.py', options).then(bookJson =>{
				// results is an array consisting of messages collected during execution
				console.log('results: %j', bookJson);
				booksJson.push(bookJson)
			})
		}
	}
}



