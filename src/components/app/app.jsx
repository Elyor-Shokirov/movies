import { Route, Routes } from 'react-router'
import DeteiledPage from '../../Pages/DeteiledPage'
import ErrorPage from '../../Pages/ErrorPage'
import HomePage from '../../Pages/HomePage'
import TvShowsPage from '../../Pages/TVshowsPage'
import Navbar from '../navbar/navbar'

const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/tv' element={<TvShowsPage />} />
				<Route path='/movie/:movieID' element={<DeteiledPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</div>
	)
}

export default App
