import { Link } from 'react-router-dom';

export default function RegisterPage() {
    return (
        <div className="mt-4 flex grow items-center justify-around">
            <div className="mb-36">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form action="" className="max-w-md mx-auto">
                    <input type="text" placeholder="John Doe" />
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="password" />
                    <button className="primary mt-4">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?{' '}
                        <Link className="underline text-black" to={'/login'}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
