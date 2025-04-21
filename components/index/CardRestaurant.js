import Link from "next/link"
import ImageSupabase from "../ImageSupabase"

export default function CardRestaurant({ data }) {
    const {enlace, name, description, address, banner_url } = data
    return <div className="col-xxl-4 col-md-6">
        <div
            className="destination-item style-four"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
        >
            <div className="image">
                <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                </div>
                <a href="#" className="heart">
                    <i className="fas fa-heart" />
                </a>
                <ImageSupabase
                    url={banner_url}
                    buckets={'banners'}
                    alt="Destination"
                    className="w-full aspect-[3/4] h-80 lg:h-96"
                />
            </div>
            <div className="content">
                <span className="flex items-center gap-2 line-clamp-2">
                    <i className="fal fa-map-marker-alt " /> <span className="line-clamp-1">
                        {address}
                    </span>
                </span>
                <h5>
                    <Link href="destination-details">
                        {name}
                    </Link>
                </h5>
                <span className="time line-clamp-1">{description}</span>
            </div>
            <div className="destination-footer">
                <span className="price">
                    <span>$35.000 ±</span>/plato
                </span>
                <Link href={`/que-hacer/${enlace}`} className="read-more">
                    Ver más <i className="fal fa-angle-right" />
                </Link>
            </div>
        </div>
    </div>
}