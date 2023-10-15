import {useState, useEffect} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'


import './App.css'
import Game from './pages/game/component'
import Login from './pages/login/component'
import Profile from './pages/profile/component'
import AIBooks from './pages/ai-books/component'
import Register from './pages/register/component'


function App() {

	const location = useLocation()
	const [displayLocation, setDisplayLocation] = useState(location)
	const [transitionStage, setTransistionStage] = useState("fadeIn")

	useEffect(() => {
		if (location !== displayLocation) setTransistionStage("fadeOut")
	}, [location, displayLocation])

	const handleAnimationEnd = () => {
		if (transitionStage === "fadeOut") {
			setTransistionStage("fadeIn")
			setDisplayLocation(location)
		}
	}

	return (
		<div
			className={`${transitionStage} flexColumn`}
			onAnimationEnd={handleAnimationEnd}
		>
			<Routes location={displayLocation}>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/ai-books" element={<AIBooks />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</div>
	)
}

export default App
