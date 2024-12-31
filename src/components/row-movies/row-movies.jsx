import React, { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
// import MovieService from '../../services/movie-service'
import { useLocation } from 'react-router'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import MoviesInfo from '../movies-info/movies-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'
const RowMovies = () => {
	const [movies, setMovie] = useState([])
	const [open, setOpen] = useState(false)
	const [movieID, setMovieID] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	const { pathname } = useLocation

	const { getAllTranding, getDetailedMovies, loading, error } =
		useMovieService()

	useEffect(() => {
		getTrendingMovies()
	}, [])

	const onClose = () => {
		setOpen(false)
	}

	const onOpen = id => {
		setMovieID(id)
		setOpen(true)
	}

	const getTrendingMovies = page => {
		getAllTranding(page)
			.then(res => setMovie(movies => [...movies, ...res]))
			.finally(() => setNewItemLoading(false))
	}

	const getMoreMovies = () => {
		setPage(page => page + 1)
		setNewItemLoading(true)
		getTrendingMovies(page)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null

	return (
		<div className='rowmovies'>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src='/tranding.svg' alt='' />
					<h1>Trending</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>
			{errorContent}
			{loadingContent}
			<Content movies={movies} onOpen={onOpen} />

			<div className='rowmovies__loadmore '>
				<button
					className='btn btn__secondary'
					onClick={getMoreMovies}
					disabled={newItemLoading}
				>
					Load More
				</button>
			</div>
			<Modal open={open} onClose={onClose}>
				<MoviesInfo movieID={movieID} getDetailedMovies={getDetailedMovies} />
			</Modal>
		</div>
	)
}

export default RowMovies

const Content = ({ movies, onOpen }) => {
	return (
		<div className='rowmovies__lists'>
			{movies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}
