import Link from "next/link"
import ImageSupabase from "../ImageSupabase"
1
export default function CardHotel({ data }) {
    const { name, description, address, banner_url, enlace } = data

    return <div className="col-xxl-6 col-xl-9 col-lg-10">
        <div
            className="destination-item style-four image-left"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
        >
            <div className="image ">
                <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                </div>
                <a href="#" className="heart">
                    <i className="fas fa-heart" />
                </a>
                <ImageSupabase url={banner_url} buckets={'banners'} alt={`${name} image`} className="w-full aspect-[3/4] h-80 lg:h-96" />
            </div>
            <div className="content">
                <span className="flex items-center gap-2 line-clamp-2">
                    <i className="fal fa-map-marker-alt" /> <span className="line-clamp-2">
                        {address}
                    </span>
                </span>
                <h5>
                    <Link href="tour-details">{name}</Link>
                </h5>
                <p className="text line-clamp-2">
                    {description}
                </p>
                <span className="price">
                    {/* <span>$58.00</span>/per night */}
                </span>
                <Link href={`/que-hacer/${enlace}`} className="theme-btn style-three">
                    <span data-hover="Book Now">Ver más</span>
                    <i className="fal fa-arrow-right"/>
                </Link>
            </div>
        </div>
    </div>
}