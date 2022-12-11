import { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
    const [apiString, setApiString] = useState('');

    const getData = () => {
        axios.get('/api').then((response) => {
            console.log(response.data);
            setApiString(() => response.data);
        }).catch((error) => {
            console.log('Something horrible went wrong!');
            console.log(error);
            return 'error';
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <h1>{apiString}</h1>
            </header>
        </div>
    );
}

export default App;
