import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { Navbar } from './components';
import {
    Cubetimer,
    Home,
    Tasks
} from './pages';
import './styles/css/mystyles.css'; // import custom styling into project

// Router logic for the site. Import page components from components/ directory.
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path='cubetimer' element={<Cubetimer />} />
                    <Route path='tasks' element={<Tasks />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
