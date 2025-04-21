'use client'

import Link from "next/link"
import ImageSupabase from "../ImageSupabase"

const CardCategory = ({ data }) => {



  return (<div key={data.name} className="col-xxl-3 col-xl-4 col-sm-6">
    <div
      className="destination-item style-two bgc-lighter"
      data-aos="flip-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div className="relative w-full  p-2 aspect-[4/3] object-cover ">
        <ImageSupabase url={data.image_url} buckets={'categories_image'} alt="Destination" className='w-full aspect-[9/8] object-cover rounded-md' />
        <span className="absolute bottom-4 right-4 bg-white rounded-md px-[0.7rem] py-[0.1rem] text-[0.9rem] text-black flex gap-2 justify-center items-center">
          <i className="far fa-map-marker-alt" /> {data.name}
        </span>
      </div>
      <div className="py-3 px-2">
        <h6>
          <Link href={`/${data.name.split(' ').join('-')}`}>{data.name}</Link>
        </h6>
        <span className="time">{data.businesses.length}+ Lugares</span>
      </div>
    </div>
  </div>)
}

export default CardCategory