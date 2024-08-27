'use client';
import Link from 'next/link';
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
    const session = useSession();
    // console.log(session);

    return(
      <div className='bg-base-100 text-slate-900'>
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <Link href='/'>
              <Image src='/assets/logo.svg' height={60} width={100} alt='logo'/>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <div className='flex items-center space-x-6'>
              {
                navItems.map(nav => <Link href={nav.path} key={nav.path} className='font-semibold hover:text-primary duration-300'>{nav.title}</Link>)
              }
            </div>
          </div>
          <div className="navbar-end">
            <div className='flex items-center space-x-3'>
              <FaCartPlus className='text-xl'/>
              <FaSearch className='text-xl'/>
              <a className="btn btn-primary btn-outline px-8">Appointment</a>
              {
                session.status === 'authenticated' ? <button className="btn btn-primary px-8" onClick={() => signOut()}>Logout</button> : <Link href="/login" className="btn btn-primary px-8">Login</Link>
              }
               <div>
                  <h6>{session?.data?.user?.name}</h6>
              </div>
               {session?.data && (<div className='rounded-full er-3 overflow-hidden size-12'>
                   <Image src={session?.data?.user?.image} width={50} height={50} alt={session?.data?.user?.image}/>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    );
};

const navItems = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Services',
      path: '/services'
    },
    {
      title: 'My Bookings',
      path: '/my-bookings'
    },
    {
      title: 'Blog',
      path: '/blog'
    },
    {
      title: 'Contacts',
      path: '/contacts'
    }
    ];

export default NavBar;
