'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import SocialSignIn from "@/components/shared/SocialSignIn";
import { toast } from 'react-toastify';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const path = searchParams.get('redirect');

    const handleLogIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const res = await signIn('credentials', {email, password, redirect: true, callbackUrl: path ? path : '/'});
        toast.success('Login Success!');
    };

    return(
        <div className='container mx-auto px-24 py-24'>
            <div className='grid grid-cols-2 gap-12 items-center'>
                <div>
                    <Image src={'/assets/images/login/login.svg'} height={540} width={540} alt='login Image'/>
                </div>
                <div className='border-2 p-12'>
                    <h6 className='text-3xl font-semibold text-center mb-12 text-primary'>Sign In</h6>
                    <form onSubmit={handleLogIn}>
                        <label htmlFor='email'>Email</label><br/>
                        <input type="email" name='email' placeholder="Your Email" className="mt-3 input input-bordered w-full" /><br/><br/>
                        <label htmlFor='password'>Password</label><br/>
                        <input type="password" name='password' placeholder="Your Password" className="mt-3 input input-bordered w-full" />
                        <button type='submit' className='btn btn-primary w-full mt-12'>Sign In</button>
                        <div>
                            <h6 className='text-center mt-6'>or sign in with</h6>
                            <SocialSignIn />
                            <h6 className='text-center mt-6'>Don't Have account? <Link href='/signup' className='text-primary font-semibold'>Sign Up</Link> </h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
