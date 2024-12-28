import { useHttp } from '../hooks/use-http'

const useMovieService = () => {
	const { request, loading, error, clearError } = useHttp()
	const _apiBase = 'https://api.themoviedb.org/3'
	const _apiLanguage = 'language=en-US'
	const _imgUrl = 'https://image.tmdb.org/t/p/original'
	const _apiPage = 1

	const getPopularMovie = async () => {
		return request(
			`${_apiBase}/movie/popular?${_apiLanguage}&page=3e&api_key=${
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
		console.log(movie)
		return _transformMOvie(movie)
	}

	const getRandomMovie = async () => {
		const res = await getPopularMovie()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return _transformMOvie(movie)
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
	return {
		getAllTranding,
		getRandomMovie,
		getDetailedMovies,
		loading,
		error,
		clearError,
	}
}

export default useMovieService
