import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { Navbar } from './components';
import {
    CubetimerPage,
    HomePage,
    TasksPage
} from './pages';
import './styles/mystyles.css'; // import custom styling into project

// Router logic for the site.
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route index element={<HomePage />} />
                    <Route path='cubetimer' element={<CubetimerPage />} />
                    <Route path='tasks' element={<TasksPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
