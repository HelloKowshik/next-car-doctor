'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const MyBookingsPage = () => {
    const session = useSession();
    const [bookings, setBookings] = useState([]);
    const loadData = async () => {
        const res = await fetch(`http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`);
        const data = await res.json();
        setBookings(data?.myBookings);
    };

    const handleDelete = async (id) => {
        const deletedBooking = await fetch(`http://localhost:3000/my-bookings/api/booking/${id}`, {method: 'DELETE'});
        const res = await deletedBooking.json();
        if(res.response?.deletedCount > 0){
            toast.success(res?.message);
            loadData();
        }
    };

    useEffect(() => {
        loadData();
    }, [session]);

    return(
        <div className='container mx-auto'>
            <div className="relative  h-72">
            <Image
              className="absolute h-72 w-full left-0 top-0 object-cover"
              src={'/assets/images/about_us/parts.jpg'}
              alt="service"
              width={1920}
              height={1080}
              style={{ width: "90vw" }}
            />
            <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
              <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
                 My Bookings
              </h1>
            </div>
          </div>
          <div className='mt-12'>
              <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Service Name</th>
                        <th>Price</th>
                        <th>Booking Date</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        bookings?.length > 0 && bookings.map((booking, i) => <tr key={booking._id}>
                        <th>{i + 1}</th>
                        <td>{booking.title}</td>
                        <td>{booking.price}</td>
                        <td>{booking.date}</td>
                        <td>{booking.address}</td>
                        <td>
                            <div className='flex items-center space-x-3'>
                                <Link href={`/my-bookings/update/${booking._id}`}><button className='btn btn-success'><FaRegEdit /></button></Link>
                                <button onClick={() => handleDelete(booking._id)} className='btn btn-error'><MdDelete /></button>
                            </div>
                        </td>
                      </tr>)
                      }
                    </tbody>
                  </table>
              </div>
          </div>
        </div>
    );
};

export default MyBookingsPage;
