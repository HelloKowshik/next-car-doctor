import { connectDB } from '@/lib/connectDB';
import bcrypt from "bcrypt"
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try{
        const newUser = await request.json();
        const db = await connectDB();
        const usersCollection = db.collection('users');
        const isExists = await usersCollection.findOne({email: newUser.email});
        if(isExists){
            return NextResponse.json({message: 'User Already Exists!'});
        }
        const hashedPass = bcrypt.hashSync(newUser.password, 14);
        const res = await usersCollection.insertOne({...newUser, password: hashedPass});
        return NextResponse.json({message: 'New User Created!'}, {status: 200});
    }catch(err){
        return NextResponse.json({message: err.message}, {status: 500});
    }
};
