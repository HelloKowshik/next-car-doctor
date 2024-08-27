import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from '@/lib/connectDB';
import bcrypt from "bcrypt";

export const options = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 
    },
    providers: [CredentialsProvider({
        credentials: {
            email: {},
            password: {}
        },
        async authorize(credentials){
            const { email, password } = credentials;
            if(!email || !password){
                return null;
            }
            const db = await connectDB();
            const user = await db.collection('users').findOne({email: email});
            if(!user){
                return null;
            }
            const matchedPass = bcrypt.compareSync(password, user.password);
            if(!matchedPass){
                return null;
            }
            return user;
        }
    }),
    GoogleProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
    clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
    clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    })
    ],
    callbacks: {
        async signIn({user, account}){
            if(account.provider === 'google' || account.provider === 'github'){
                const {name, email, image} = user;
                try{
                    const db = await connectDB();
                    const userCollection = db.collection('users')
                    const isExists = await userCollection.findOne({email});
                    if(!isExists){
                        const res = await userCollection.insertOne(user);
                        return user;
                    }else{
                        return user;
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                return user;
            }
        }
    },
    pages:{
        signIn: '/login'
    }
};

const handler = NextAuth(options);


export {handler as GET, handler as POST};
