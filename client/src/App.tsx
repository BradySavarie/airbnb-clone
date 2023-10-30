import { Routes, Route } from 'react-router';
import './App.css';
import IndexPage from '../src/pages/IndexPage';
import LoginPage from '../src/pages/LoginPage';
import Layout from './Layout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
