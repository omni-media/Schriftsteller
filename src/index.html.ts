import {template, html} from "@benev/turtle"

const {url} = import.meta

export default template(async({path}) => html`
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<link rel="icon" type="image/svg+xml" href="/vite.svg" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Vite + React + TS</title>
		</head>
		<body>
			<div id="root"></div>
			<script defer type="module" src="${path(url).version.root('/frontend/main.js')}"></script>
		</body>
	</html>
`)
