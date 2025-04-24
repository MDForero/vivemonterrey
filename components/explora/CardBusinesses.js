'use client'
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton" 

export default function CardBusinesses({data}) {
    const path = usePathname()
    const { name, banner_url, address, website, phone, enlace, description } = data
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {

        async function downloadImage(path) {
            setLoading(true)
            try {
                const { data, error } = await supabase.storage.from('banners').download(path)
                if (error) {
                    throw error
                }
                const url = URL.createObjectURL(data)
                setImageUrl(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
            setLoading(false)
        }

        if (banner_url) downloadImage(banner_url)
    }, [banner_url, supabase])

    return (
              <div
                className="destination-item tour-grid style-three bgc-lighter max-w-96"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  <span className="badge bgc-pink">{data?.data?.categories[0]?.name}</span>
                  <a href="#" className="heart">
                    <i className="fas fa-heart" />
                  </a>
                  <div className="relative max-h-80 group overflow-hidden ">
                {loading ? <>
                    <Skeleton className="w-96 h-60" /><div className="absolute inset-y-0 inset-x-0 flex justify-center items-center">

                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50"><g><g transform="rotate(0 50 50)">
                            <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                <animate repeatCount="indefinite" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                            </rect>
                        </g><g transform="rotate(30 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(60 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.75s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(90 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(120 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(150 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.5s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(180 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(210 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(240 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.25s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(270 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(300 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g transform="rotate(330 50 50)">
                                <rect fill="#fe718d" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                    <animate repeatCount="indefinite" begin="0s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity" />
                                </rect>
                            </g><g /></g></svg>
                    </div>
                </>
                    :
                    <Link href={path + enlace} className="overflow-hidden ">
                        {imageUrl ? <Image src={imageUrl} loading="lazy" alt={name} width={0} height={0} className="w-96 h-60  object-cover group-hover:scale-125 duration-200 rounded-md" /> : null}
                    </Link>}
            </div>
                </div>
                <div className="content">
                  <div className="destination-header flex ">
                    <span className="line-clamp-1 flex gap-1 items-center w-3/5 ">
                      <i className="fal fa-map-marker-alt" /> <span className="line-clamp-1 w-4/5">{address}</span>
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  <h5>
                    <Link href={path + enlace} className='text-[1.2rem] font-bold '>
                      {name}
                    </Link>
                  </h5>
                  <p className="line-clamp-3">
                    {description}
                  </p>
                  {/* <ul className="blog-meta">
                    <li>
                      <i className="far fa-clock" /> 3 days 2 nights
                    </li>
                    <li>
                      <i className="far fa-user" /> 5-8 guest
                    </li>
                  </ul> */}
                  <div className="destination-footer">
                    {/* <span className="price">
                      <span>$58.00</span>/person
                    </span> */}
                    <Link
                      href={enlace}
                      className="theme-btn style-two style-three w-full"
                    >
                      <span data-hover="Book Now">Ver Más</span>
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
    )
}