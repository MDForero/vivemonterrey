import Link from "next/link";
import ImageSupabase from "../ImageSupabase";

export default function Gallery({ data }) {
    return (
        <div className="">
            <div className="">
                <div className="flex flex-wrap gap-4 justify-center relative">
                    <div className="basis-full md:basis-1/4">
                        <div className="gallery-item">
                            <ImageSupabase
                                url={data[0] ?? '/assets/images/gallery/gallery1.jpg'}
                                alt="Destination"
                                className="w-full h-full aspect-video object-cover rounded-sm shadow-xl"
                                buckets='banners'
                            />
                        </div>
                        <div className="gallery-item mt-4">
                            <ImageSupabase
                                url={data[1] ?? '/assets/images/gallery/gallery1.jpg'}
                                alt="Destination"
                                className="w-full h-full aspect-video object-cover rounded-sm shadow-xl"
                                buckets='banners'
                            />
                        </div>
                    </div>
                    <div className="basis-full md:basis-1/4">
                        <div className="gallery-item">
                            <ImageSupabase
                                url={data[2] ?? '/assets/images/gallery/gallery1.jpg'}
                                alt="Destination"
                                className="w-full aspect-[5/6] object-cover rounded-sm shadow-xl"
                                buckets='banners'
                            />
                        </div>
                    </div>
                    <div className="basis-full md:basis-1/4">
                        <div className="gallery-item">
                            <ImageSupabase
                                url={data[3] ?? '/assets/images/gallery/gallery1.jpg'}
                                alt="Destination"
                                className="w-full h-full aspect-video object-cover rounded-sm shadow-xl"
                                buckets='banners'
                            />
                        </div>
                        <div className="gallery-item mt-4">
                            <ImageSupabase
                                url={data[4] ?? '/assets/images/gallery/gallery1.jpg'}
                                alt="Destination"
                                className="w-full h-full aspect-video object-cover rounded-sm shadow-xl"
                                buckets='banners'
                            />
                        </div>
                    </div>
                    <div className="w-full"></div>
                   
                </div>
            </div>
        </div>
    );
}