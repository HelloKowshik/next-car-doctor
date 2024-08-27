import { connectDB } from '@/lib/connectDB';
import { services } from '@/lib/Services';

export const GET = async() =>{
    const db = await connectDB();
    const servicesCollection = db.collection('services');
    try{
        await servicesCollection.deleteMany();
        const res = await servicesCollection.insertMany(services);
        return Response.json({message: 'Seed Success!'});
    }catch(err){
        console.log(err);
    }
};
