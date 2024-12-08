import './row-movies-item.scss'
const RowMoviesItem = ({ movie, onToggleOpen }) => {
	return (
		<div className='movieitem' onClick={onToggleOpen}>
			<img src={movie.thumbnail} alt={movie.title} />
			<h2>
				{movie.name.length > 18 ? ` ${movie.name.slice(0, 18)}...` : movie.name}
			</h2>
			<div className='movieitem-descr'>
				<img src='/date.svg' alt='Date Icon' />
				<p>{movie.release_date}</p>
				<div className='dot' />
				<p>{movie.vote_average.toFixed(1)}</p>
				<img src='/star.svg' alt='Date Icon' />
			</div>
		</div>
	)
}

export default RowMoviesItem
