import {useLocation, Link} from "react-router-dom"

import styles from "./style.module.css"

export default function Navigation() {
	const location = useLocation()

	return (
		<nav className={styles.navigation}>
			<ol>
				<li>
					<Link className={location.pathname === "/ai-books" ? styles.active : ""} to="/ai-books">
						AI-books
					</Link>
				</li>
				<li>
					<Link className={location.pathname === "/game" ? styles.active : ""} to="/game">
						Game
					</Link>
				</li>
				<li>
					<Link className={location.pathname === "/profile" ? styles.active : ""} to="/profile">
						Profile
					</Link>
				</li>
				<li><Link className={styles.logout} to="/">Logout</Link></li>
			</ol>
		</nav>
	)
}
