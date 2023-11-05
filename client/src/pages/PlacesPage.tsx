import React, { ChangeEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../components/Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
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

    async function addPhotoByLink(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', {
            link: photoLink,
        });
        setAddedPhotos((prev) => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
        const files: FileList | null = e.target.files;

        if (files) {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                data.append('photos', file);
            }
            axios
                .post('/upload', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    const { data: filenames } = response;
                    setAddedPhotos((prev) => {
                        return [...prev, ...filenames];
                    });
                });
        }
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
                    <form>
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
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={photoLink}
                                onChange={(e) => setPhotoLink(e.target.value)}
                                placeholder="Add using a link ...jpg"
                            />
                            <button
                                onClick={addPhotoByLink}
                                className="bg-gray-200 px-4 rounded-2xl"
                            >
                                Add&nbsp;Photo
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
                            {addedPhotos.length > 0 &&
                                addedPhotos.map((link) => (
                                    <div>
                                        <img
                                            className="max-h-48 rounded-2xl object-cover aspect-square"
                                            src={
                                                'http://localhost:4000/uploads/' +
                                                link
                                            }
                                            alt="property photo"
                                        />
                                    </div>
                                ))}
                            <label className="flex items-center justify-center gap-1 py-8 border bg-transparent rounded-2xl text-2xl text-gray-600 cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={uploadPhoto}
                                    multiple
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Upload
                            </label>
                        </div>
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
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}
