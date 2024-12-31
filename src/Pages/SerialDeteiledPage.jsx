import React from 'react'
import DeteliedMovie from '../components/detelied-movie/deteliedMovie'
import useMovieService from '../services/movie-service'

const SerialDeteiledPage = () => {
	const { getDetiledSerials } = useMovieService()

	return (
		<div>
			<DeteliedMovie getDetailedMovies={getDetiledSerials} />
		</div>
	)
}

export default SerialDeteiledPage
