'use client'

import Link from "next/link"
import ImageSupabase from "../ImageSupabase"

const CardCategory = ({ data }) => {



  return (<div key={data.name} className="basis-1/2 sm:basis-1/2 md:basis-1/4  p-2">
    <div
      className="destination-item style-two bgc-lighter p-2"
      data-aos="flip-up"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <Link href={`/${data.name.split(' ').join('-')}`} className=" relative w-full aspect-[9/8] block overflow-hidden rounded-md">
        <ImageSupabase url={data.image_url} buckets={'categories_image'} alt="Destination" className='w-full aspect-[9/8] object-cover rounded-md' />
        <span className="sm:hidden absolute bottom-4 right-4 bg-white rounded-md px-[0.7rem] py-[0.1rem] text-[0.9rem] text-black flex gap-2 justify-center items-center">
          <i className="far fa-map-marker-alt " /> {data.businesses.length}+ Lugares
        </span>
      </Link>
      <div className="py-3 px-2">
        <h6>
          <Link href={`/${data.name.split(' ').join('-')}`}>{data.name}</Link>
        </h6>
        <span className="time ">{data.businesses.length}+ Lugares</span>
      </div>
    </div>
  </div>)
}

export default CardCategory