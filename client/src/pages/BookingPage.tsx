import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookingType } from './BookingsPage';
import axios from 'axios';

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

    return <div>Booking: {id}</div>;
}
