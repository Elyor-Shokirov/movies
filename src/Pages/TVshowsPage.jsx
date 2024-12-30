import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { useNavigate } from 'react-router'
import Error from '../components/error/error'
import MoviesInfo from '../components/movies-info/movies-info'
import RowMoviesItem from '../components/row-movies-item/row-movies-item'
import Spinner from '../components/spinner/spinner'
import useMovieService from '../services/movie-service'

const TvShowsPage = () => {
	const [tvShows, setTvShow] = useState([])
	const [open, setOpen] = useState(false)
	const [movieID, setMovieID] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	const { getDetiledSerials, getTvShows, error, loading } = useMovieService()
	useEffect(() => {
		getShows()
	}, [])

	const onClose = () => {
		setOpen(false)
	}

	const onOpen = id => {
		setMovieID(id)
		setOpen(true)
	}

	const getShows = page => {
		getTvShows(page)
			.then(res => setTvShow(tvShows => [...tvShows, ...res]))
			.finally(() => setNewItemLoading(false))
	}
	const getMoreMovies = () => {
		setPage(page => page + 1)
		setNewItemLoading(true)
		getShows(page)
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
			<Content tvShows={tvShows} onOpen={onOpen} />
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
				<MoviesInfo movieID={movieID} getDetailedMovies={getDetiledSerials} />
			</Modal>
		</div>
	)
}

export default TvShowsPage

const Content = ({ tvShows, onOpen }) => {
	const navigate = useNavigate()

	return (
		<>
			<div className='rowmovies__lists'>
				{tvShows &&
					tvShows.map(tvShow => (
						<RowMoviesItem key={tvShow.id} movie={tvShow} onOpen={onOpen} />
					))}
			</div>
		</>
	)
}
