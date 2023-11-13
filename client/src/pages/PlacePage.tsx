import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PlacesType } from './PlacesPage';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState<PlacesType | null>(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    if (showAllPhotos) {
        window.scrollTo(0, 0);

        return (
            <div className="absolute inset-0 bg-black min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-white mr-48">
                            Photos of {place.title}
                        </h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="flex fixed gap-1 py-2 px-4 rounded-2xl shadow shadow-gray-500 right-12 top-8"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Close
                        </button>
                    </div>
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo) => (
                            <div className="flex justify-center">
                                <img
                                    className="md:max-w-4xl"
                                    src={
                                        'http://localhost:4000/uploads/' + photo
                                    }
                                    alt=""
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
            <h1 className="text-3xl ">{place.title}</h1>
            <a
                className="flex gap-1 my-3 font-semibold underline"
                target="_blank"
                href={'https://maps.google.com/?q=' + place.address}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                </svg>
                {place.address}
            </a>
            <PlaceGallery place={place} />

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl ">Description</h2>
                        {place.description}
                    </div>
                    Check In: {place.checkIn} <br />
                    Check Out: {place.checkOut} <br />
                    Max Number of Guests: {place.maxGuests} <br />
                </div>
                <BookingWidget place={place} />
            </div>
            <div className="bg-white -mx-8 px-9 py-8 mt-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl ">Extra Info</h2>
                </div>
                <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    );
}
