import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Slider from 'react-slick'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'

const ActorsCarousel = ({ movieID }) => {
	const [actors, setActors] = useState([])

	const { getSerialActors, getActors, loading, error } = useMovieService()

	const { pathname } = useLocation()
	console.log(pathname)

	useEffect(() => {
		updateMovie()
	}, [])

	const updateMovie = () => {
		const fetchActors =
			pathname === `/tv/movie/${movieID}` ? getSerialActors : getActors
		fetchActors(movieID).then(res => setActors(res))
	}

	var settings = {
		dots: true,
		// lazyLoad: true,
		infinite: true,
		slidesToShow: 8,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 2000,
		adaptiveHeight: true,
		centerPadding: '60px',

		// infinite: true,

		nextArrow: false,
		prevArrow: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	return (
		<>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src='/tranding.svg' alt='' />
					<h1>Actors</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>
			<div className='container_wrapper_carousel'>
				<div className='wrapper_carousel'>
					<div className='carousel_bg'></div>
					<Slider {...settings}>
						{loadingContent}
						{actors &&
							actors.map(movie => {
								return (
									<div className='wrapper_carousel_card' key={movie.id}>
										<div className='image'>
											{loadingContent}
											{errorContent}
											<img
												src={
													movie.image
														? `https://image.tmdb.org/t/p/original/${movie.image}`
														: `https://api.dicebear.com/9.x/initials/svg?seed=${movie.name}`
												}
												alt=''
											/>
										</div>
										<p className='title'>{movie.name}</p>
										<p className='date_title'>{movie.character}</p>
									</div>
								)
							})}
					</Slider>
				</div>
			</div>
		</>
	)
}

export default ActorsCarousel
