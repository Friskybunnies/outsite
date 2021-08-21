import React from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

function LocationImageSquares(props) {

    const getSelectedLocation = (e) => {
        props.handleSelectedLocation(e);
    }

    return (
        <div className="container mx-auto px-8 my-16">
            <Tab.Group>
                <div className="grid grid-cols-7">
                    {['United States', 'Latin America', 'Europe', 'Asia Pacific', 'Caribbean'].map((area, index) => (
                        <Tab key={area} value={index}>
                            {({ selected }) => (
                                <div id={area}
                                    className={classNames(selected
                                        ? ' items-center border font-medium bg-green-600 bg-opacity-70 w-40 rounded-2xl pt-3 pb-3 mb-8 shadow-sm text-white justify-center text-white'
                                        : ' items-center font-medium w-40 justify-center bg-white text-gray-700 rounded-2xl pt-3 pb-3 mb-8',
                                        'duration-200'
                                    )} onClick={getSelectedLocation}
                                >
                                    {area}
                                </div>
                            )}
                        </Tab>
                    ))}
                </div>
                <Tab.Panels>
                    <div className="grid grid-cols-4 gap-6">
                        {props.locations.filter(location => location.region === props.selectedLocation).map((location) => {
                            return (
                                <div key={location.id}>
                                    <a href={`https://app.outsite.co/book-now/search?where=${location.id}`}>
                                        <img src={location.wfContent.cityImage} alt="city" className="aspect-w-4 aspect-h-3 w-full h-52 rounded-md" style={{ backgroundSize: "cover" }} />
                                        <div className="py-3 ">
                                            <h4 className="text-lg text-left font-medium text-gray-900">{location.wfContent?.name}</h4>
                                            <p className="text-sm text-left text-gray-600">{location.wfContent?.houseName}</p>
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default LocationImageSquares;