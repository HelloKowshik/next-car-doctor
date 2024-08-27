'use client';
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const SocialSignIn = () => {
    const searchParams = useSearchParams();
    const path = searchParams.get('redirect');
    const handleSocialLogin = (provider) =>{
        const res = signIn(provider, {redirect: true, callbackUrl: path ? path : '/'});
    };

    return(
        <div className="flex items-center justify-center space-x-3">
            <button onClick={() => handleSocialLogin('google')} className="btn flex items-center justify-center text-green-500">
              <FaGoogle />
            </button>
            <button onClick={() => handleSocialLogin('github')} className="btn flex items-center justify-center text-primary">
              <FaGithub />
            </button>
    </div>
    );
};

export default SocialSignIn;
