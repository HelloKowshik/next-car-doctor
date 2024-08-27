const Banner = () => {
    return(
        <div className='container mx-auto'>
        <div className="carousel w-full mt-12">
            {
                banners.map((banner, i) => <div key={i} id={`slide${i+1}`} className="carousel-item relative w-full bg-top bg-no-repeat h-[90vh] rounded-xl" style={{backgroundImage: `linear-gradient(45deg,rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${i+1}.jpg)`}}>
                <div className='h-full w-full flex items-center pl-36'>
                    <div className='text-white space-y-6'>
                        <h1 className='text-5xl font-bold'>{banner.title}</h1>
                        <p>{banner.description}</p>
                        <button className='btn btn-primary mr-4'>Discover More</button>
                        <button className='btn btn-primary btn-outline'>Latest Projects</button>
                    </div>
                </div>
                <div className="absolute bottom-5 right-12 transform justify-between">
                  <a href={banner.prev} className="btn btn-circle mr-6">❮</a>
                  <a href={banner.next} className="btn btn-circle">❯</a>
                </div>
            </div>)
            }
        </div>
        </div>
    );
};

const banners = [
  {
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide2",
    prev: "#slide4",
  },
  {
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide3",
    prev: "#slide1",
  },
  {
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide4",
    prev: "#slide2",
  },
  {
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of  available, but the majority have suffered alteration in some form",
    next: "#slide1",
    prev: "#slide3",
  },
];

export default Banner; 
