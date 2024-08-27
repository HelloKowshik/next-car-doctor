import { connectDB } from '@/lib/connectDB';
import { services } from '@/lib/Services';
import { NextResponse } from 'next/server';

export const GET = async() =>{
    const db = await connectDB();
    const servicesCollection = db.collection('services');
    try{
        await servicesCollection.deleteMany();
        const res = await servicesCollection.insertMany(services);
        return NextResponse.json({message: 'Seed Success!'});
    }catch(err){
        return NextResponse.json({message: err.message});
    }
};
