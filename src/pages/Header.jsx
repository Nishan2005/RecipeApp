// src/components/Header.jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src="/logo.png" alt="Logo" />
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chefs">Chefs</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
}

export default Header;