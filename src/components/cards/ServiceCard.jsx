import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({service}) => {
    return(
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <Image src={service.img} width={430} height={120} alt={service.title}/>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.title}</h2>
              <div className="card-actions justify-between items-center">
                <h6 className='text-primary font-semibold'>Price: ${service.price}</h6>
                <Link href={`/services/${service._id}`}><button className="btn btn-primary">View Details</button></Link>
              </div>
            </div>
        </div>
    );
};

export default ServiceCard;
