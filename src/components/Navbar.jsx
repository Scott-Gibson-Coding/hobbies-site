import {
    Link,
    Outlet
} from 'react-router-dom';

// Navigation panel for each page in the project.
const Navbar = () => {
    return (
        <div>
            <nav className='navbar is-link'>
                <div className='navbar-brand'>
                    <Link className='navbar-item' to='/'>
                        Home
                    </Link>
                    <Link className='navbar-item' to='/cubetimer'>
                        Cube Timer
                    </Link>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;