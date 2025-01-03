import './/spinner.scss'

const Spinner = ({ width = '50px' }) => {
	return (
		<div className='center'>
			<div className='loader' style={{ width: width }} />
		</div>
	)
}

export default Spinner
