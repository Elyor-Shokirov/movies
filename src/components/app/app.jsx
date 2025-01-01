import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
// import DeteiledPage from '../../Pages/DeteiledPage'
// import HomePage from '../../Pages/HomePage'
import Navbar from '../navbar/navbar'
import Spinner from '../spinner/spinner'

const HomePage = lazy(() => import('../../Pages/HomePage'))
const ErrorPage = lazy(() => import('../../Pages/ErrorPage'))
const DeteiledPage = lazy(() => import('../../Pages/DeteiledPage'))
const SerialDeteiledPage = lazy(() => import('../../Pages/SerialDeteiledPage'))
const TvShowsPage = lazy(() => import('../../Pages/TVshowsPage'))

const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/tv' element={<TvShowsPage />} />
					<Route path='/tv/movie/:movieID' element={<SerialDeteiledPage />} />
					<Route path='/movie/:movieID' element={<DeteiledPage />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App
