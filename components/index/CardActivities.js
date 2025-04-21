import Image from "next/image";
import Link from "next/link";

export default function CardActivities({ data }) {

    const { title, tours, image } = data;

    return <div
        key={title}
        className="col-xl-4 col-md-6"
        data-aos="flip-up"
        data-aos-duration={1500}
        data-aos-offset={50}
    >
        <div className="activity-item">
            <div className="image">
                <Image
                    loading='lazy'
                    src={image}
                    alt="Activity"
                    className="w-28 aspect-square object-cover "
                    width={0}
                    height={0}
                />
            </div>
            <div className="content">
                <h5>
                    <Link href="tour-details">{title}</Link>
                </h5>
                <span className="time">{tours}</span>
            </div>
            <div className="right-btn">
                <a href="#" className="more">
                    <i className="fas fa-chevron-right" />
                </a>
            </div>
        </div>
    </div>
}