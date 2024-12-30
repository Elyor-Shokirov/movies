import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './hero.scss'
const Hero = () => {
	const [movie, setMovie] = useState(null)

	const { getRandomMovie, loading, error, clearError } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [])

	const updateMovie = () => {
		clearError()
		getRandomMovie().then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<div className='hero'>
			<div className='hero__info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
					ducimus atque, fuga sit illum at deserunt facere voluptatum neque
					possimus in numquam nobis animi id harum rerum qui non temporibus.
				</p>
				<div>
					<button className='btn btn__secondary' onClick={updateMovie}>
						Random movie
					</button>
				</div>
			</div>
			<div className='hero__movie'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({ movie }) => {
	const navigate = useNavigate()

	return (
		<>
			<img src={movie.backdrop_path} alt='Hero Img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length > 250
						? `${movie.description.slice(0, 100)}...`
						: movie.description}
				</p>
				<div className='hero__btns'>
					<button
						className='btn btn__primary'
						onClick={() => navigate(`/movie/${movie.id}`)}
					>
						Details
					</button>
				</div>
			</div>
		</>
	)
}
