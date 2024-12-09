import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
// import MovieService from '../../services/movie-service'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import MoviesInfo from '../movies-info/movies-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'
class RowMovies extends React.Component {
	state = {
		loading: true,
		error: false,
		open: false,
		movies: [],
		movieID: null,
		page: 2,
		newItemLoading: false,
	}
	movieService = new MovieService()

	componentDidMount() {
		this.getTrendingMovies()
	}

	onClose = () => {
		this.setState({ open: false })
	}

	onOpen = id => {
		this.setState({ open: true, movieID: id })
	}

	getTrendingMovies = page => {
		this.movieService
			.getAllTranding(page)
			.then(res =>
				this.setState(({ movies }) => ({ movies: [...movies, ...res] }))
			)
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false, newItemLoading: false }))
	}

	getMoreMovies = () => {
		this.setState(({ page }) => ({ page: page + 1, newItemLoading: true }))
		this.getTrendingMovies(this.state.page)
	}

	render() {
		const { open, movies, movieID, error, loading, page, newItemLoading } =
			this.state
		console.log(page)
		const errorContent = error ? <Error /> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !(error || loading) ? (
			<Content movies={movies} onOpen={this.onOpen} />
		) : null

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
				{content}
				<div className='rowmovies__loadmore '>
					<button
						className='btn btn__secondary'
						onClick={this.getMoreMovies}
						disabled={newItemLoading}
					>
						Load More
					</button>
				</div>
				<Modal open={open} onClose={this.onClose}>
					<MoviesInfo movieID={movieID} />
				</Modal>
			</div>
		)
	}
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
