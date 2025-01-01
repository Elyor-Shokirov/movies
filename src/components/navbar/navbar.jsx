import React from 'react'
import { Link, NavLink } from 'react-router'
import logoText from '../../../public/logo-text.svg'
import logo from '../../../public/logo.svg'
import './navbar.scss'

const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__logo'>
				<Link to='/'>
					<img src={logo} alt='Logo' />
					<img src={logoText} alt='Logo-text' />
				</Link>
			</div>
			<nav className='navbar__menu'>
				<ul>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? 'active' : '')}
							to='/'
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/tv'
							className={({ isActive }) => (isActive ? 'active' : '')}
						>
							Serials
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
