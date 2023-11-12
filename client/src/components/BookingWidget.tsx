import { useContext, useEffect, useState } from 'react';
import { PlacesType } from '../pages/PlacesPage';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router';
import { UserContext } from '../context/UserContext';

export default function BookingWidget({ place }: { place: PlacesType }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');

    const { user } = useContext(UserContext) || { user: undefined };

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            place: place._id,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <div className="bg-white shadow p-4 rounded-2xl ">
                <div className="text-2xl text-center">
                    Price: ${place.price} / per night
                </div>

                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check In: </label>
                            <input
                                value={checkIn}
                                type="date"
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check Out: </label>
                            <input
                                value={checkOut}
                                type="date"
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label>Number of Guests: </label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={(e) =>
                                setNumberOfGuests(parseInt(e.target.value))
                            }
                        />
                    </div>
                    {numberOfNights > 0 && (
                        <>
                            <div className="py-3 px-4 border-t">
                                <label>Full Name: </label>
                                <input
                                    placeholder="John Doe"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label>Phone Number: </label>
                                <input
                                    placeholder="555-555-5555"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>

                <button onClick={bookThisPlace} className="primary mt-4">
                    Book Place
                    {numberOfNights > 0 && (
                        <span> ${numberOfNights * place.price}</span>
                    )}
                </button>
            </div>
        </div>
    );
}
