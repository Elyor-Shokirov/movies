import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useMovieService from '../../services/movie-service'
import ActorsCarousel from '../carousel/actorsCarousel'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './deteliedMovie.scss'

const DeteliedMovie = ({ getDetailedMovies }) => {
	const [movie, setMovie] = useState(null)

	const { movieID } = useParams()

	const { loading, error, clearError } = useMovieService()

	useEffect(() => {
		clearError()
		if (movieID) {
			updateMovie()
		}
	}, [movieID])

	const updateMovie = () => {
		if (!movieID) {
			return
		}
		getDetailedMovies(movieID).then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} movieID={movieID} />
	) : null
	return (
		<>
			{errorContent}
			{loadingContent}
			{content}
		</>
	)
}

const Content = ({ movie, movieID }) => {
	return (
		<>
			<div className='deteiledmovie'>
				<div className='deteiledmovie__image'>
					<img src={movie.backdrop_path} alt={movie.name} />
				</div>
				<div className='deteiledmovie__descr'>
					<h1>{movie.name}</h1>
					<p>{movie.description}</p>
					<div className='deteiledmovie__descr-info'>
						<img src='/date.svg' alt='Date Icon' />
						<p>{movie.release_date}</p>
						<div className='dot' />
						<p>{movie.vote_average.toFixed(1)}</p>
						<img src='/star.svg' alt='Date Icon' />
					</div>
				</div>
			</div>
			<div className='deteiledmovie__actors'>
				<ActorsCarousel movieID={movieID} />
			</div>
		</>
	)
}
export default DeteliedMovie
