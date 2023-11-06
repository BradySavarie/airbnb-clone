import { ChangeEvent, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [redirect, setRedirect] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [perks, setPerks] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState<number | ''>(1);

    function preInput(header: string, description: string) {
        return (
            <>
                <h2 className="text-2xl mt-4">{header}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        );
    }

    function handleMaxGuestsChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue: number | '' =
            e.target.value !== '' ? parseInt(e.target.value, 10) : '';
        setMaxGuests(newValue);
    }

    async function addNewPlace(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const placeData = {
            title,
            address,
            description,
            addedPhotos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        };

        await axios.post('/places', placeData);
        setRedirect('/account/places');
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            {action !== 'new' && (
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
            )}
            {action === 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
                        {preInput(
                            'Title',
                            'Title for your place. Keep it short and memorable'
                        )}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title, Ex: My Apartment"
                        />
                        {preInput('Address', 'Address to your place.')}
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        {preInput('Photos', 'More = Better')}
                        <PhotosUploader
                            addedPhotos={addedPhotos}
                            onChange={setAddedPhotos}
                        />
                        {preInput('Description', 'Description of your place.')}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {preInput(
                            'Perks',
                            'Select all of the perks of your place.'
                        )}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Info', 'House Rules, etc.')}
                        <textarea
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        />
                        {preInput(
                            'Check In & Out Times',
                            'Add check in and out times. Remember to include time for cleaning between guests.'
                        )}
                        <div className="grid sm:grid-cols-3 gap-2 mb-2">
                            <div className="mt-2 -mb-2">
                                <h3>Check In Time</h3>
                                <input
                                    type="text"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    placeholder="3:00pm"
                                />
                            </div>
                            <div className="mt-2 -mb-2">
                                <h3>Check Out Time</h3>
                                <input
                                    type="text"
                                    value={checkOut}
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                    placeholder="12:00pm"
                                />
                            </div>
                            <div className="mt-2 -mb-2">
                                <h3>Max Number of Guests</h3>
                                <input
                                    type="number"
                                    min={1}
                                    value={maxGuests}
                                    onChange={handleMaxGuestsChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="primary my-4">
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
