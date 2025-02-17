'use client'
import { usePathname } from "next/navigation"

export default function ButtonShare() {
    const path = usePathname()

    const sharedClick = () => {
        if (navigator.share) {
            navigator.share({
                url: 'https://www.vivemonterrey.com.co/' + path,
                title: 'Vive Monterrey',
                text: 'Vive Monterrey',
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        } else {
            console.log('web share not supported')
        }
    }

    return (
        <button onClick={sharedClick} className="block text-right p-2 bg-green-600 ">share</button>
    )
}