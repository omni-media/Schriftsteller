"use client"
import Link from "next/link"
import Image from "next/image"
import styles from "./style.module.css"
import {usePathname} from "next/navigation"

export default function Navigation() {
	const location = usePathname()
	return (
		<>
			<Image className={styles.logo} alt="logo" width={900} height={150} src="/schriftsteller-logo.png" />
			<nav className={styles.navigation}>
				<ol>
					<li>
						<Link className={location === "/ai-books" ? styles.active : ""} href="/ai-books">
							AI-books
						</Link>
					</li>
					<li>
						<Link className={location === "/game" ? styles.active : ""} href="/game">
							Game
						</Link>
					</li>
					<li>
						<Link className={location === "/profile" ? styles.active : ""} href="/profile">
							Profile
						</Link>
					</li>
					<li><Link className={styles.logout} href="/">Logout</Link></li>
				</ol>
			</nav>
		</>
	)
}
