import { useHttp } from '../hooks/use-http'

const useMovieService = () => {
	const { request, loading, error, clearError } = useHttp()
	const _apiBase = 'https://api.themoviedb.org/3'
	const _apiLanguage = 'language=en-US'
	const _imgUrl = 'https://image.tmdb.org/t/p/original'
	const _apiPage = 1

	const getPopularMovie = async () => {
		return request(
			`${_apiBase}/movie/popular?${_apiLanguage}&page=5e&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
	}

	const getAllTranding = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/movie/top_rated?${_apiLanguage}&page=${page}}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		const movies = response.results
		return movies && movies.map(movie => _transformMOvie(movie))
	}

	const getDetailedMovies = async id => {
		const movie = await request(
			`${_apiBase}/movie/${id}?${_apiLanguage}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		return _transformMOvie(movie)
	}

	const getRandomMovie = async () => {
		const res = await getPopularMovie()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return _transformMOvie(movie)
	}

	const getTvShows = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/tv/airing_today?${_apiLanguage}&page=${page}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		const tvShows = response.results
		console.log('were', tvShows)
		return tvShows && tvShows.map(tvshows => _transformTV(tvshows))
	}

	const getDetiledSerials = async id => {
		const tvDetail = await request(
			`${_apiBase}/tv/${id}?${_apiLanguage}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		return _transformTV(tvDetail)
	}

	const getActors = async id => {
		const response = await request(
			`${_apiBase}/movie/${id}/credits?${_apiLanguage}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		const actors = response.cast
		return actors && actors.map(actor => _transformActor(actor))
	}

	const _transformActor = actor => {
		return {
			name: actor.original_name,
			character: actor.character,
			image: actor.profile_path,
			id: actor.id,
		}
	}

	const _transformMOvie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			thumbnail: `${_imgUrl}${movie.poster_path}`,
			backdrop_path: `${_imgUrl}${movie.backdrop_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}

	const _transformTV = movie => {
		return {
			name: movie.name,
			orginal_name: movie.original_name,
			description: movie.overview,
			thumbnail: `${_imgUrl}${movie.poster_path}`,
			backdrop_path: `${_imgUrl}${movie.backdrop_path}`,
			id: movie.id,
			release_date: movie.first_air_date,
			vote_average: movie.vote_average,
			vote_count: movie.vote_count,
		}
	}

	return {
		getAllTranding,
		getPopularMovie,
		getRandomMovie,
		getDetailedMovies,
		getTvShows,
		loading,
		error,
		clearError,
		getDetiledSerials,
		getActors,
	}
}

export default useMovieService
