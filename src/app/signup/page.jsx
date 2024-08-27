'use client';
import Image from 'next/image';
import Link from 'next/link';
import SocialSignIn from "@/components/shared/SocialSignIn";
import { toast } from 'react-toastify';

const SignupPage = () => {
    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            image: e.target.image.value,
            password: e.target.password.value,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if(res.status === 200){
            toast.success(res?.message);
            e.target.reset();
        }
    };

    return(
        <div className='container mx-auto px-24 py-24'>
            <div className='grid grid-cols-2 gap-12 items-center'>
                <div>
                    <Image src={'/assets/images/login/login.svg'} height={540} width={540} alt='login Image'/>
                </div>
                <div className='border-2 p-12'>
                    <h6 className='text-3xl font-semibold text-center mb-12 text-primary'>Sign Up</h6>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor='name'>Name</label><br/>
                        <input type="text" name='name' placeholder="Your Name" className="mt-3 input input-bordered w-full" /><br/><br/>
                        <label htmlFor='email'>Email</label><br/>
                        <input type="email" name='email' placeholder="Your Email" className="mt-3 input input-bordered w-full" /><br/><br/>
                        <label htmlFor='image'>Image URL</label><br/>
                        <input type="text" name='image' placeholder="Image URL" className="mt-3 input input-bordered w-full" /><br/><br/>
                        <label htmlFor='password'>Password</label><br/>
                        <input type="password" name='password' placeholder="Your Password" className="mt-3 input input-bordered w-full" />
                        <button type='submit' className='btn btn-primary w-full mt-12'>Sign Up</button>
                        <div>
                            <h6 className='text-center mt-6'>or sign up with</h6>
                            <SocialSignIn />
                            <h6 className='text-center mt-6'>Have account? <Link href='/login' className='text-primary font-semibold'>Sign In</Link> </h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
