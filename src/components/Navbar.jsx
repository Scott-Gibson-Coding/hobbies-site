import {
    Link,
    Outlet
} from 'react-router-dom';

// Navigation panel for each page in the project.
const Navbar = () => {
    return (
        <div>
            <nav class='navbar is-link'>
                <div class='navbar-brand'>
                    <Link class='navbar-item' to='/'>
                        Home
                    </Link>
                    <Link class='navbar-item' to='/cubetimer'>
                        Cube Timer
                    </Link>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;