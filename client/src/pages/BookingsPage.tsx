import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';
import { PlacesType } from './PlacesPage';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';

export type BookingType = {
    place: PlacesType;
    user: string;
    checkIn: string;
    checkOut: string;
    name: string;
    phone: string;
    price: number;
    _id: string;
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<BookingType[]>([]);
    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="flex flex-col gap-2">
                {bookings?.length > 0 &&
                    bookings.map((booking) => (
                        <Link
                            to={`/account/bookings/${booking._id}`}
                            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                        >
                            <div className="w-48">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 grow pr-3">
                                <h2 className="text-xl">
                                    {booking.place.title}
                                </h2>
                                <BookingDates booking={booking} />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
