import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

export default function ProfilePage() {
    const contextValue = useContext(UserContext);
    const [redirect, setRedirect] = useState<string | null>(null);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!contextValue) return null;
    const { user, setUser, ready } = contextValue;

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user!.name} ({user!.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">
                        Logout
                    </button>
                </div>
            )}
            {subpage === 'places' && <PlacesPage />}
        </div>
    );
}
