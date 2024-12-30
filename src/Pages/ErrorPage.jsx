import React from 'react'

const ErrorPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				height: '85vh',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<h1>404 Page Not Found</h1>
			<img src='./pageNotFound.png' alt='' />
		</div>
	)
}

export default ErrorPage
