"use client"

import Login from "./(pages)/login/page"
import AIBooks from "./(pages)/ai-books/page"

export default function App() {
	const logged = true

	return logged
		? <AIBooks/> 
		: <Login/>
}
