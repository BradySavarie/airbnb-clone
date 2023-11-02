import {
    ReactNode,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';

type User = {
    // Define your user type here
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
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
