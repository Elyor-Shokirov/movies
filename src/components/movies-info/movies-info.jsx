import React from 'react'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movies-info.scss'
class MoviesInfo extends React.Component {
	state = {
		movie: null,
		loading: false,
		error: false,
	}

	movieService = new MovieService()

	componentDidMount() {
		this.updateMovie()
	}

	updateMovie = () => {
		const { movieID } = this.props
		if (!movieID) {
			this.setState({ error: true })
		}

		this.movieService
			.getDetailedMovies(movieID)
			.then(res => this.setState({ movie: res }))
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		const { movie, loading, error } = this.state

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
}

export default MoviesInfo

const Content = ({ movie }) => {
	return (
		<>
			<img src={movie.backdrop_path} alt='Hero Img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
			</div>
		</>
	)
}
