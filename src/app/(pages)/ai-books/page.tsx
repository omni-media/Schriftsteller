"use client"
import {useState, useEffect} from "react"

import {Book} from "@/app/types"
import Navigation from "@/app/components/navigation/component"

export default function AIBooks() {
	const [books,setBooks]= useState<Book[] | []>([]);
	const getData=()=>{
		fetch(`books.json`
		,{
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			 }
		}
		)
			.then(function(response){
				return response.json();
			})
			.then(function(myJson) {
				setBooks(myJson)
			});
	}
	useEffect(()=>{
		getData()
	},[])

	return (
		<>
			<Navigation />
			<div>AiBooks</div>
			{books.map((book, i) => (
				<div key={i}>
					<h2>{book.title}</h2>
					<p>{book.description}</p>
					<a href="/some_book.html">read book</a>
				</div>
			))}
		</>
	)
}
