import { Routes, Route } from 'react-router';
import './App.css';
import IndexPage from '../src/pages/IndexPage';
import LoginPage from '../src/pages/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/account/:subpage?"
                        element={<AccountPage />}
                    />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
