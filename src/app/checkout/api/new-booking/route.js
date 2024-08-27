import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export const POST = async(request) => {
    const booking = await request.json();
    const db = await connectDB();
    const bookingCollection = db.collection('bookings');
    try{
        const newBooking = await bookingCollection.insertOne(booking);
        return NextResponse.json({message: 'Service booked!'}, {status: 200});
    }catch(err){
        return NextResponse.json({message: err.message}, {status: 400});
    }
};
