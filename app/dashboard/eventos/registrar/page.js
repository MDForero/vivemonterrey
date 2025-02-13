'use client'
import { registerEvent } from "./action"


export default function Page() {
    
    const minDate = new Date().toISOString().split('T')[0]

    return (
        <div className='flex items-center justify-center w-full h-screen'>

            <div className="    flex  max-w-96 flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre del Evento   
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                Ubicación
                            </label>
                            <div className="mt-2">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="event_date" className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha del evento
                            </label>
                            <div className="mt-2">
                                <input
                                    id="event_date"
                                    name="event_date"
                                    type="date"
                                    required
                                    min={minDate}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                    Banner del evento
                                </label>
                                <div className="text-sm">
                                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                  </a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                           
                        </div>

                        <div>
                            <button
                                formAction={registerEvent}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}