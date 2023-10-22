import {Book} from "../types"

export async function get_books() {
	const response = await fetch(`books.json`,{
		headers : {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
		.then(function(response){
			return response.json();
	})
	return response as Book[]
}
