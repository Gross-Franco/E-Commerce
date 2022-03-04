import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="register--header">
    <nav className="register--header-nav">
      <Link to="/" className="register--header-nav--back">
        <BsArrowLeftShort className="register--header-nav--back-icon" />
        <p className="register--header-nav--back-span">Volver</p>
      </Link>
      <Link to="/" className="register--header-nav--logo">
        commerce
      </Link>
    </nav>
  </header>
  )
}

export default Header