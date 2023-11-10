import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlacesType } from './PlacesPage';
import { Link } from 'react-router-dom';

export default function IndexPage() {
    const [places, setPlaces] = useState<PlacesType[]>([]);

    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
        });
    });

    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {places.length > 0 &&
                places.map((place) => (
                    <Link to={'/place/' + place._id}>
                        <div className="bg-gray-500 rounded-2xl mb-2 flex">
                            {place.photos?.[0] && (
                                <img
                                    className="rounded-2xl  object-cover aspect-square"
                                    src={
                                        'http://localhost:4000/uploads/' +
                                        place.photos[0]
                                    }
                                />
                            )}
                        </div>
                        <h2 className="font-bold leading-2 truncate">
                            {place.address}
                        </h2>
                        <h3 className="text-sm leading-4 text-gray-500 truncate">
                            {place.title}
                        </h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span>{' '}
                            per night
                        </div>
                    </Link>
                ))}
        </div>
    );
}
