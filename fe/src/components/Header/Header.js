import css from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className={css.header}>
      <NavLink to='/'>
        <img className={css.img} src='../img/book.png' alt='logoNav' />
      </NavLink>
      <nav>
        <NavLink className={css['nav-link']} to={'/'}>
          Home
        </NavLink>
        <NavLink className={css['nav-link']} to={'/books'}>
          Books
        </NavLink>
        <NavLink className={css['nav-link']} to={'/login'}>
          Login
        </NavLink>
        <NavLink className={css['nav-link']} to={'/register'}>
          Register
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
