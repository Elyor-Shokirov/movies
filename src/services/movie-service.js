class MovieService {
	_apiBase = 'https://api.themoviedb.org/3'
	_apiLanguage = 'language=en-US'
	_imgUrl = 'https://image.tmdb.org/t/p/original'

	getResource = async url => {
		const response = await fetch(url)
		if (!response) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`)
		}
		return await response.json()
	}

	getPopularMovie = async () => {
		return this.getResource(
			`${this._apiBase}/movie/popular?${this._apiLanguage}&page=1&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
	}

	getAllTranding = async () => {
		const response = await this.getResource(
			`${this._apiBase}/movie/top_rated?${this._apiLanguage}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
		const movies = response.results
		return movies && movies.map(movie => this._transformMOvie(movie))
	}

	getDetailMovies = async id => {
		return this.getResource(
			`${this._apiBase}/movie/${id}?${this._apiLanguage}&api_key=${
				import.meta.env.VITE_ACCESS_KEY
			}`
		)
	}
	getRandomMovie = async () => {
		const res = await this.getPopularMovie()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return this._transformMOvie(movie)
	}
	_transformMOvie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			thumbnail: `${this._imgUrl}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}
}

export default MovieService
