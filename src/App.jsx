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
