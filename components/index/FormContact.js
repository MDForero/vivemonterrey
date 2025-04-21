'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Counter from '../Counter'

const FormContact = () => {
    return (

        <div className="col-xxl-4 col-md-6">
            <div
                className=" p-6 bg-[#1C231F] shadow-md rounded-lg"
                data-aos="zoom-in-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
            >
                <div className="section-title counter-text-wrap mb-10 text-white">
                    <h4 className="">¿Buscas planes o destinos en Monterrey?</h4>
                    <p className="count-text plus">
                        Más de{" "}
                        <span className="font-bold text-[#F7921E]">
                            <Counter start={0} end={100} duration={2} />{" "}
                        </span>{" "}
                        experiencias únicas para descubrir en nuestro municipio
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destinations</label>
                    <Select>
                        <SelectTrigger className="bg-[#2A2F2B] text-gray-300">
                            <SelectValue placeholder="City or Region" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="city">City</SelectItem>
                            <SelectItem value="region">Region</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">All Activity</label>
                    <Select>
                        <SelectTrigger className="bg-[#2A2F2B] text-gray-300">
                            <SelectValue placeholder="Choose Activity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Departure Date</label>
                    <Input type="date" className="bg-[#2A2F2B] text-gray-300" />
                </div>
                <div className="mb-4"></div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Guests</label>
                <Select>
                    <SelectTrigger className="bg-[#2A2F2B] text-gray-300">
                        <SelectValue placeholder="Select Guests" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                    </SelectContent>
                </Select>
                <div className="mt-6"></div>
                <Button className="w-full bg-[#F7921E] text-white hover:bg-[#e6831b]">
                    Search
                </Button>
            </div>
        </div>
    )
}

export default FormContact
