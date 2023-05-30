import React from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

const NavBar = () => {
  const jwtToken = localStorage.getItem("token")

  const handleLogout = () => {
		localStorage.removeItem("token")
		window.location = 'http://localhost:3000'
	}

  return (
    <div className='navbar'>
        <div className='navbar-left'>
            Strateg.In
        </div>
        <div className='navbar-right'>
            <Link to="/" className="button-link">Accueil</Link>
            <Link to="/users" className="button-link">Utilisateurs</Link>
            <Link to="/projects" className="button-link">Projets</Link>
            {jwtToken ?
              <button className="red_btn" onClick={handleLogout}>
                Se Déconnecter
              </button>
              :
              <Link to="/login" className="blue_btn">Se Connecter</Link>
            }
        </div>
    </div>
  )
}

export default NavBar