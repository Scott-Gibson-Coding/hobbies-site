/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import {
    Link,
    Outlet
} from 'react-router-dom';

/*
 * Navbar Component
 */
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
                    <Link className='navbar-item' to='/tasks'>
                        Tasks
                    </Link>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;