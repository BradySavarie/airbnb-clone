import axios from 'axios';
import {
    ReactNode,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
};

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

type UserContextProviderProps = {
    children: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
