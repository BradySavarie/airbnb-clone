import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

type PlacesType = {
    _id: string;
    owner: string;
    title: string;
    address: string;
    description: string;
    photos: string[];
    perks: string[];
    extraInfo: string;
    checkIn: string;
    checkOut: string;
    maxGuests: number;
};

export default function PlacesPage() {
    const [places, setPlaces] = useState<PlacesType[]>([]);

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link
                    className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                    to={'/account/places/new'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Add New Place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 &&
                    places.map((place) => (
                        <Link
                            to={'/account/places/' + place._id}
                            className="flex bg-gray-100 p-4 gap-4 rounded-2xl cursor-pointer"
                        >
                            <div className="bg-gray-300 w-32 h-32 grow shrink-0">
                                {place.photos.length > 0 && (
                                    <img
                                        src={`http://localhost:4000/uploads/${place.photos[0]}`}
                                        alt="Property photo"
                                    />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">
                                    {place.description}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
