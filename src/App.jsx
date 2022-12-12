import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {
    Cubetimer,
    Home,
    Navbar
} from './components';
import 'bulma/css/bulma.css'; // import bulma styling into project

// Router logic for the site. Import page components from components/ directory.
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path='cubetimer' element={<Cubetimer />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
