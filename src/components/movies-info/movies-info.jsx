import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movies-info.scss'
const MoviesInfo = ({ movieID, getDetailedMovies }) => {
	const [movie, setMovie] = useState(null)

	const { loading, error, clearError } = useMovieService()
	useEffect(() => {
		updateMovie()
	}, [movieID])

	const updateMovie = () => {
		if (!movieID) {
			error
		}
		clearError()
		getDetailedMovies(movieID).then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

export default MoviesInfo

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<>
			<img src={movie.backdrop_path} alt='Hero Img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
				<button
					className='btn btn__light'
					onClick={() => navigate(`movie/${movie.id}`)}
				>
					Details
				</button>
			</div>
		</>
	)
}
