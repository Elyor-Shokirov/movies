import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import useMovieService from '../../services/movie-service'
import './carausel.scss'
const Carousel = () => {
	const [polularMovies, setPolularMovies] = useState([])

	const { getPopularMovie } = useMovieService()

	useEffect(() => {
		getPopular()
	}, [])

	const getPopular = () => {
		getPopularMovie().then(res => setPolularMovies(res.results))
	}

	var settings = {
		dots: true,
		// lazyLoad: true,
		infinite: true,
		slidesToShow: 8,
		slidesToScroll: 1,
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
	return (
		<>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src='/tranding.svg' alt='' />
					<h1>Popular MOVIES</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>
			<div className='container_wrapper_carousel'>
				<div className='wrapper_carousel'>
					<div className='carousel_bg'></div>
					<Slider {...settings}>
						{polularMovies &&
							polularMovies.map(movie => {
								return (
									<div className='wrapper_carousel_card' key={movie.id}>
										<div className='image'>
											<img
												src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
												alt=''
											/>
										</div>
										<p className='title'>
											{movie.original_title && movie.original_title.length > 4
												? `${movie.original_title.slice(0, 20)}...`
												: movie.original_title}
										</p>
										<p className='date_title'>{movie.release_date}</p>
									</div>
								)
							})}
					</Slider>
				</div>
			</div>
		</>
	)
}

export default Carousel
