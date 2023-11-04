import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function AccountPage() {
    const contextValue = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!contextValue) return null;
    const { user, ready } = contextValue;

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    function linkClasses(type: string | null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex mt-8 gap-2 justify-center">
                <Link className={linkClasses('profile')} to={'/account'}>
                    My profile
                </Link>
                <Link
                    className={linkClasses('bookings')}
                    to={'/account/bookings'}
                >
                    My bookings
                </Link>
                <Link
                    className={linkClasses('accommodations')}
                    to={'/account/accommodations'}
                >
                    My accommodations
                </Link>
            </nav>
        </div>
    );
}
