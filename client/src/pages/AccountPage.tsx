import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router';

export default function AccountPage() {
    const contextValue = useContext(UserContext);
    console.log(contextValue);
    if (!contextValue) return null;

    const { user, ready } = contextValue;

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    return <div>Account Page for {user!.name}</div>;
}
