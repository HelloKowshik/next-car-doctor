'use client';
import Image from 'next/image';
import { getServiceDetails } from '@/services/getServices';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const CheckOutPage = ({params}) => {
    const [service, setService] = useState({});
    const { data } = useSession();

    const loadService = async () => {
        const details = await getServiceDetails(params.id);
        setService(details.service);
    };
    const {_id, service_id, title, description, img, facility, price } = service || {};
    const serviceObject = {serviceID: _id, title, img, price};
    
    const handleBooking = async (e) => {
        e.preventDefault();
        const newBooking = {
            name: data?.user?.name,
            email: data?.user?.email,
            address: e.target.address.value,
            date: e.target.date.value,
            phone: e.target.phone.value,
            ...serviceObject
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/new-booking`, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        });
        const response = await res?.json();
        toast.success(response?.message);
        e.target.reset();
    };

    useEffect(() => {
        loadService();
    }, [params]);

    return(
        <div className='container mx-auto'>
            <div className="relative h-72">
                <Image
                  className="absolute h-72 w-full left-0 top-0 object-cover"
                  src={img}
                  alt="service"
                  width={1920}
                  height={1080}
                  style={{ width: "90vw" }}
                />
                <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
                  <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
                     Checkout {title}
                  </h1>
                </div>
            </div>
            <div className='my-12 bg-slate-300 p-12'>
                <form onSubmit={handleBooking}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Name</span>
                          </label>
                          <input defaultValue={data?.user?.name} readOnly type="text" name="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Date</span>
                          </label>
                          <input defaultValue={new Date().getDate()} type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Email</span>
                          </label>
                          <input
                          defaultValue={data?.user?.email}
                            readOnly
                            type="text"
                            name="email"
                            placeholder="email"
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Due amount</span>
                          </label>
                          <input
                          defaultValue={price}
                          readOnly
                            type="text"
                            name="price"
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Phone</span>
                          </label>
                          <input
                          required
                            type="text"
                            name="phone"
                            placeholder="Your Phone"
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Present Address</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Your Address"
                            className="input input-bordered"
                          />
                        </div>
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary btn-block"
                      type="submit"
                      value="Order Confirm"
                    />
                  </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOutPage;
