'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SectionTitle ({ title, description }) {
    const path = usePathname()
    const pathCategory = path.slice(1,-1).split('/').shift().split('-').join(' ')
    const pathBusinesess = path.slice(1,-1).split('/').pop().split('-').join(' ')
    return (
        <section className="page-banner-two rel z-1">
        <div className="container-fluid">
          <hr className="mt-0" />
          <div className="container">
            <div className="banner-inner pt-15 pb-25">
              <h2
                className="page-title mb-10"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                {pathBusinesess}
              </h2>
              <nav aria-label="breadcrumb">
                <ol
                  className="breadcrumb justify-content-center mb-20"
                  data-aos="fade-right"
                  data-aos-delay={200}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <li className="breadcrumb-item">
                    <Link href={`/${pathCategory.split(' ').join('-')}`}>{pathCategory}</Link>
                  </li>
                  <li className="breadcrumb-item active">{pathBusinesess}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
    )
}