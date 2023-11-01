import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await axios.post('/register', { name, email, password });
            alert('Registration Successful. Now you can login.');
        } catch {
            alert('Registration Failed. Please try again later.');
        }
    }
    return (
        <div className="mt-4 flex grow items-center justify-around">
            <div className="mb-36">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form
                    action=""
                    className="max-w-md mx-auto"
                    onSubmit={registerUser}
                >
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary mt-4">Register</button>
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
