import React from 'react'
import './navbar.scss'
const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__logo'>
				<a href='#'>
					<img src='./logo.svg' alt='Logo' />
					<img src='./logo-text.svg' alt='Logo-text' />
				</a>
			</div>
			<nav className='navbar__menu'>
				<ul>
					<li>
						<a href='#'>Home</a>
					</li>
					<li>
						<a href='#'>TV Shows</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
