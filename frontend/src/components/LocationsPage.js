import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import Guests from './Guests';
import Space from './Space';
import Covid from './Covid';
import Hero from '../images/Hero.png';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import LocationImageSquares from './LocationImageSquares';

function LocationsPage() {

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("United States");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedPlaceId, setSelectedPlaceId] = useState('lb');
    const [selectedPlaceName, setSelectedPlaceName] = useState("Lisbon - Cais do Sodre");
    const [selectedGuestNumber, setSelectedGuestNumber] = useState(1);
    const [selectedGuestNumberText, setSelectedGuestNumberText] = useState("One guest");

    useEffect(() => {
        const fetchLocations = async () => {
            const { data } = await axios.get('http://localhost:5000');
            console.log(data.locations);
            setLocations(data.locations);
        }
        fetchLocations();
    }, [])

    const handleSelectedPlace = (e) => {
        setSelectedPlaceId(e.id);
        setSelectedPlaceName(e.wfContent?.name);
    }

    const handleSelectedLocation = (e) => {
        setSelectedLocation(e.target.id);
    }

    const handleSelectedGuests = (e) => {
        setSelectedGuestNumber(e.target.id);
        setSelectedGuestNumberText(e.target.value);
    }

    return (
        <div className="">
            <div className="px-0">
                <div className="max-w-full h-96 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Hero})`, backgroundSize: 'fill' }}>
                </div>
                <div className="container mx-auto px-8">
                    <div className="-mt-28 mb-10 ">
                        <div className="text-white font-semibold text-3xl mb-4 text-left">
                            Work anywhere. Live differently.
                        </div>
                    </div>
                    <div className="w-full px-3 px-8 py-3 border rounded-md border-gray-300 shadow-sm bg-white filter drop-shadow-md">
                        <div className="grid grid-cols-6 gap-2 items-end">
                            <div className="col-span-2">
                                <div className="text-left text-sm font-medium text-gray-700">Space</div>
                                <Space locations={locations} selectedPlaceId={selectedPlaceId} selectedPlaceName={selectedPlaceName} handleSelectedPlace={handleSelectedPlace} ></Space>
                            </div>
                            <div className="col-span-2">
                                <div className="text-left text-sm font-medium text-gray-700 mt-1">Dates</div>
                                <div className="flex w-full rounded-md border border-gray-300 py-1.5">
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="text-left text-sm font-medium text-gray-700 cursor-pointer"></DatePicker>
                                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="text-left text-sm font-medium text-gray-700 cursor-pointer"></DatePicker>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-left text-sm font-medium text-gray-700">Guests</div>
                                <Guests selectedGuestNumber={selectedGuestNumber} selectedGuestNumberText={selectedGuestNumberText} handleSelectedGuests={handleSelectedGuests}></Guests>
                            </div>
                            <div className="h-10">
                                <a href={`https://app.outsite.co/book-now/search?where=${selectedPlaceId}&guests=${selectedGuestNumber}&startDate=${startDate.toISOString().slice(0, 10)}&endDate=${endDate.toISOString().slice(0, 10)}`}>
                                    <button type='button' className='inline-flex w-full justify-center items-center border font-medium rounded pt-2 pb-2 shadow-sm text-white bg-green-600 bg-opacity-70'>
                                        Search
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Covid></Covid>
            <LocationImageSquares locations={locations} selectedLocation={selectedLocation} handleSelectedLocation={handleSelectedLocation}></LocationImageSquares>
        </div>
    );
}

export default LocationsPage;