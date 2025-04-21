import Link from "next/link"

export default function CardBenefits ({data}){
    const {title, description, icon} = data
    return <div className="col-xxl-4 col-xl-5 col-md-6">
    <div className="feature-item style-two">
      <div className="icon">
        <i className={icon} />
      </div>
      <div className="content">
        <h5>
          <Link href="/categorias/alojamientos">
            {title}
          </Link>
        </h5>
        <p>
          {description}
        </p>
      </div>
    </div>
  </div>
}