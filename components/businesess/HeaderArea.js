export default function HeaderArea({ data }) {
    const {address, name} = data
    return <section className="tour-header-area pt-70 rel z-1">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-xl-6 col-lg-7">
                    <div
                        className="tour-header-content mb-15"
                        data-aos="fade-left"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                    >
                        <span className="location d-inline-block mb-10">
                            <i className="fal fa-map-marker-alt" /> <span className="line-clamp-1">{address}</span>
                        </span>
                        <div className="section-title pb-5">
                            <h2>
                                {name}
                            </h2>
                        </div>
                        <div className="ratting">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                        </div>
                    </div>
                </div>
                <div
                    className="col-xl-4 col-lg-5 text-lg-end"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                >
                    <div className="tour-header-social mb-10">
                        <a href="#">
                            <i className="far fa-share-alt" />
                            Share tours
                        </a>
                        <a href="#">
                            <i className="fas fa-heart bgc-secondary" />
                            Wish list
                        </a>
                    </div>
                </div>
            </div>
            <hr className="mt-50 mb-70" />
        </div>
    </section>
}