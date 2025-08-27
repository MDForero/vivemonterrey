import VCardDownloadButton from '../../../components/VCardDownloadButton'
import Image from 'next/image'


export function generateMetadata({ params }) {
    const { user } = params
    return {
        title: `Perfil de ${user}`,
        description: `Página de perfil del usuario ${user}`,
    }
}

export async function generateStaticParams(){
    const data = await fetch("https://www.vivemonterrey.com.co/team.json").then(res => res.json()).catch(err => console.log(err)).finally(() => console.log("Fetch finalizado"));
    return data?.map(user => ({
        user: user.name.replace(" ", "-").toLowerCase()
    })) || [];
}


export default async function Page({ params }) {
    const { user } = params
    const data = await fetch("https://www.vivemonterrey.com.co/team.json").then(res => res.json()).catch(err => console.log(err)).finally(() => console.log("Fetch finalizado"));

    
    if (data) {
        const userData = data.find(u => u.name.replace(" ", "-").toLowerCase() === user) || null;
        if (!userData) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Usuario no encontrado</h1>
                        <p className="text-gray-600">El usuario que buscas no existe en nuestro equipo.</p>
                    </div>
                </div>
            )
        }

        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Header con imagen y info básica */}
                        <div className="relative w-full h-64">
                            {userData.imgBackground ? 
                                <Image
                                    src={userData.imgBackground}
                                    alt={`Fondo de ${userData.name}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 w-full h-full object-cover"
                                /> : <div className='absolute inset-0 w-full h-full bg-gradient-to-tr from-amber-00 to-green-950'></div>
                            }  
                            <div className="absolute inset-0 top-0 p-4 flex flex-col sm:flex-row items-center gap-6 bg-gray-900/40">
                                <div className="relative">
                                    <Image
                                        src={userData.imgProfile}
                                        alt={`Foto de perfil de ${userData.name}`}
                                        width={120}
                                        height={120}
                                        className="rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h1 className="text-3xl text-gray-200 font-bold mb-2">{userData.name}</h1>
                                    <p className="text-xl text-gray-100 mb-4">{userData.job}</p>
                                    <VCardDownloadButton 
                                        userData={userData} className='text-white bg-green-900'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Redes sociales */}
                        <div className="px-6 py-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Redes Sociales</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {userData.socials?.facebook && (
                                    <a
                                        href={userData.socials.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700">Facebook</span>
                                    </a>
                                )}
                                
                                {userData.socials?.instagram && (
                                    <a
                                        href={userData.socials.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.198 14.895 3.5 13.559 3.5 12.017s.698-2.878 1.621-3.694c.88-.807 2.031-1.297 3.328-1.297s2.448.49 3.328 1.297c.923.816 1.621 2.152 1.621 3.694s-.698 2.878-1.621 3.694c-.88.807-2.031 1.297-3.328 1.297zm7.072 0c-1.297 0-2.448-.49-3.328-1.297-.923-.816-1.621-2.152-1.621-3.694s.698-2.878 1.621-3.694c.88-.807 2.031-1.297 3.328-1.297s2.448.49 3.328 1.297c.923.816 1.621 2.152 1.621 3.694s-.698 2.878-1.621 3.694c-.88.807-2.031 1.297-3.328 1.297z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700">Instagram</span>
                                    </a>
                                )}

                                {userData.socials?.tiktok && (
                                    <a
                                        href={userData.socials.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700">TikTok</span>
                                    </a>
                                )}

                                {userData.socials?.github && (
                                    <a
                                        href={userData.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700">GitHub</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}