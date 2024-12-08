import './hero.scss'

const Hero = () => {
	return (
		<div className='hero'>
			<div className='hero__info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
					ducimus atque, fuga sit illum at deserunt facere voluptatum neque
					possimus in numquam nobis animi id harum rerum qui non temporibus.
				</p>
				<button className='btn btn__primary'>Details</button>
			</div>
			<div className='hero__movie'>
				<img src='/image1.jpg' alt='Hero Img' />
				<div className='hero__movie-descr'>
					<h2>Madellin</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
						aliquid dolore impedit obcaecati nobis at repellat non rem, amet
						fuga illum molestias quos quisquam nisi mollitia odio quia dolores
						debitis.
					</p>
					<div>
						<button className='btn btn__secondary'>Random movie</button>
						<button className='btn btn__primary'>Details</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
