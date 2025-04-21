'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'


export default function ImageSupabase({ buckets, url, className, alt }) {
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    useEffect(() => {
        async function downloadImage() {
            try {

                const { data, error } = await supabase.storage.from(buckets).download(url)
                if (error) {
                    console.log('Error downloading image: ', error)
                    throw error
                }
                const image = URL.createObjectURL(data)
                setImageUrl(image)
                setLoading(false)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        downloadImage()
    }, [supabase])

    return (<>
        {!loading ? <Image src={imageUrl ?? url} width={0} alt={alt ?? 'Imagen de vive monterrey'} height={0} className={className} /> :
            <>
                <div className={className +' h-full max-h-96 bg-gray-400'} ></div><div className="absolute inset-y-0 inset-x-0 flex justify-center items-center">

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
            </>}
    </>
    )
}

