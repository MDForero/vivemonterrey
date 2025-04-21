import Image from "next/image";
import Link from "next/link";

export default function CardFood() {
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
                <Image loading='lazy'
                    src="assets/images/destinations/visiting-place5.jpg"
                    alt="Destination"
                    width={0}
                    height={0}
                />
            </div>
            <div className="content">
                <span className="location">
                    <i className="fal fa-map-marker-alt" /> Tours, France
                </span>
                <h5>
                    <Link href="destination-details">
                        Brown Concrete Building Basilica St Martin
                    </Link>
                </h5>
                <span className="time">3 days 2 nights - Couple</span>
            </div>
            <div className="destination-footer">
                <span className="price">
                    <span>$58.00</span>/per person
                </span>
                <a href="#" className="read-more">
                    Book Now <i className="fal fa-angle-right" />
                </a>
            </div>
        </div>
    </div>
}