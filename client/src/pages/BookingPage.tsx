import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookingType } from './BookingsPage';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState<BookingType | undefined>();

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(
                    ({ _id }: BookingType) => _id === id
                );
                console.log(foundBooking);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="mt-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 mb-4 rounded-2xl">
                <h2 className="text-xl">Your Booking Information</h2>
                <BookingDates booking={booking} />
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}
