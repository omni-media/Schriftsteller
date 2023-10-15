import {Link} from "react-router-dom"

import styles from "./style.module.css"

export default function Login() {
	return (
		<form className={styles.flexColumn}>
			<label>Username</label>
			<input />
			<label>Password</label>
			<input />
			<Link to="/ai-books">Login</Link>
		</form>
	)
}
