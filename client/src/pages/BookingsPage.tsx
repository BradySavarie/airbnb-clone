import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';

type BookingType = {
    place: string;
    user: string;
    checkIn: string;
    checkOut: string;
    name: string;
    phone: string;
    price: number;
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<BookingType[]>([]);
    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data);
        });
    }, []);

    console.log(bookings);
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 &&
                    bookings.map((booking) => (
                        <div>
                            {booking.checkIn} {'->'} {booking.checkOut}
                        </div>
                    ))}
            </div>
        </div>
    );
}
