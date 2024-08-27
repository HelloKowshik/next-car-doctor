const { MongoClient, ServerApiVersion } = require('mongodb');

let db;

export const connectDB = async () => {
    if(db) return db;
    try{
        const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.NEXT_PUBLIC_MONGO_PASS}@cluster0.zg5lt79.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        db = client.db('car-doctorDB');
        return db;
    }catch(err){
        console.log(err);
    }
};
