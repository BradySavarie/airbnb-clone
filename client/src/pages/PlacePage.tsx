import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PlacesType } from './PlacesPage';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState<PlacesType | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
            <h1 className="text-3xl ">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
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
