'use client'
import { oc } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ChevronDownIcon } from 'lucide-react';

const SearchFilter = ({ rooms, phone }) => {

  const [room, setRoom] = useState(rooms[0].name);
  const [occupancy, setOccupancy] = useState([]);
  const [guests, setGuests] = useState(0);

  const [dateCheckOut, setDateCheckOut] = useState(null);
  const [openCheckOut, setOpenCheckOut] = useState(false);

  const [dateCheckIn, setDateCheckIn] = useState(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);

  useEffect(() => {
    const data = rooms.find(r => r.name === room);
    setOccupancy(Array.from({ length: data.occupancy - data.min_occupancy + 1 }, (_, i) => i + data.min_occupancy))
    setGuests(data.occupancy);
    console.log(occupancy)
  }, [room])


  const sendToWhatsApp = () => {
    const url = new URL('https://api.whatsapp.com/send?phone=' + phone);
    url.searchParams.append('text', `Hola, estoy interesado en reservar una habitación.\n\n` +
      `Habitación: ${room}\n` +
      `Huéspedes: ${guests}\n` +
      `Check-In: ${dateCheckIn ? dateCheckIn.toLocaleDateString() : 'No seleccionado'}\n` +
      `Check-Out: ${dateCheckOut ? dateCheckOut.toLocaleDateString() : 'No seleccionado'}`);

    document.getElementById('sendToWhatsApp').href = url.toString();
    document.getElementById('sendToWhatsApp').click();
  }


  return (
    <div className="container container-1400  my-4 md:my-8 lg:my-16">
      <div
        className="search-filter-inner"
        data-aos="zoom-out-down"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        {/* <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-map-marker-alt" />
          </div>
          <span className="title">Destinations</span>
          <select name="city" id="city">
            <option value="value1">City or Region</option>
            <option value="value2">City</option>
            <option value="value2">Region</option>
          </select>
        </div> */}
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-flag" />
          </div>
          <span className="title">Habitaciones</span>
          <select name="room" id="room" onChange={(e) => setRoom(e.target.value)} value={room}>
            {rooms.map(room => <option value={room.name} key={room.name}>{room.name}</option>)}
          </select>
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-users" />
          </div>
          <span className="title">Huéspedes</span>
          <select name="guests" id="guests" onChange={(e) => setGuests(e.target.value)} value={guests}>
            {occupancy.map(guests => <option value={guests} key={guests}>{guests}</option>)}
          </select>
        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-calendar-alt" />
          </div>
          <span className="title">Check-In</span>

          <div>

            <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
              <PopoverTrigger asChild>
                <button
                  variant="outline"
                  id="date"
                  className="flex w-full h-full justify-between items-center py-3"
                >
                  {dateCheckIn ? dateCheckIn.toLocaleDateString() : "Entrada"}
                  <ChevronDownIcon />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateCheckIn}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDateCheckIn(date)
                    setOpenCheckIn(false)
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

        </div>
        <div className="filter-item clearfix">
          <div className="icon">
            <i className="fal fa-calendar-alt" />
          </div>
          <span className="title">Check-Out</span>
          <div>

            <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
              <PopoverTrigger asChild>
                <button
                  variant="outline"
                  id="date"
                  className="flex w-full h-full justify-between items-center py-3"
                >
                  {dateCheckIn ? dateCheckIn.toLocaleDateString() : "Salida"}
                  <ChevronDownIcon />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateCheckOut}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDateCheckOut(date)
                    setOpenCheckOut(false)
                  }}
                  disabled={{ before: dateCheckIn }}
                />
              </PopoverContent>
            </Popover>
          </div>

        </div>
        <div className="search-button">
          <button className="theme-btn" type='button' onClick={sendToWhatsApp}>
            <span data-hover="Search">Consultar</span>
            <i className="far fa-search" />
          </button>
        </div>
        <a href='#' id='sendToWhatsApp' className='hidden'>enviar</a>
      </div>
    </div>
  );
};
export default SearchFilter;
