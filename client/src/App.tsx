import { Routes, Route } from 'react-router';
import './App.css';
import IndexPage from '../src/pages/IndexPage';
import LoginPage from '../src/pages/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}

export default App;
