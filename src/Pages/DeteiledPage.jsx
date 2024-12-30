import React from 'react'
import { useParams } from 'react-router'
import DeteliedMovie from '../components/detelied-movie/deteliedMovie'
import useMovieService from '../services/movie-service'

const DeteiledPage = () => {
	const { getDetailedMovies } = useMovieService()

	const { movieID } = useParams()
	return (
		<div>
			<DeteliedMovie getDetailedMovies={getDetailedMovies} />
		</div>
	)
}

export default DeteiledPage
