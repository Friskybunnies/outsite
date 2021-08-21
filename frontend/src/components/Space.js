import React, { Fragment } from 'react';
import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { groupBy } from 'lodash';

function Space(props) {
    const placeGroups = groupBy(props.locations, 'region');

    const getSelectedPlace = (e) => {
        props.handleSelectedPlace(e);
    }

    return (
        <div>
            <Listbox value={props.selectedPlaceId.wfContent?.name} onChange={getSelectedPlace}>
                {({ open }) => (
                    <>
                        <div className="mt-1 relative focus:outline-none">
                            <Listbox.Button className='w-full bg-white pl-3 border border-gray-300 rounded-md shadow-sm py-2 text-left cursor-pointer text-sm focus:outline-none'>
                                <span className="w-full inline-flex focus:outline-none">
                                    <span className="">{props.selectedPlaceName}</span>
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-none">
                                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} transition duration-500 h-5 w-5 text-gray-400 focus:outline-none`} />
                                </span>
                            </Listbox.Button>
                            <Transition show={open} leave="transition-opacity ease-in duration-150 focus:outline-none" leaveFrom="opacity-90 focus:outline-none" leaveTo="opacity-0 focus:outline-none">
                            </Transition>
                            <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto text-sm focus:outline-none">
                                {Object.keys(placeGroups).map((group) => (
                                    <Disclosure key={group} defaultOpen={false} className="focus:outline-none">
                                        {({ open }) => (
                                            <div>
                                                <Disclosure.Button className="flex text-left text-lg justify-between w-full px-4 py-2 text-gray-900 focus:outline-none">
                                                    <span>{group}</span>
                                                    <ChevronUpIcon className={`${open ? 'transform rotate-180 focus:outline-none' : ''} h-5 w-5 focus:outline-none`} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 pb-2 text-gray-500 focus:outline-none">
                                                    {props.locations.filter(location => location.region === group).map(location => {
                                                        return (
                                                            <Listbox.Option key={location.id} className={({ active, selected }) => classNames(active ? 'cursor-pointer bg-gray-100' : 'cursor-default', 'relative py-1 pl-8 pr-4 focus:outline-none')} value={location} onClick={getSelectedPlace}>
                                                                {({ selected }) => (
                                                                    <div>
                                                                        <div className="flex flex-col focus:outline-none">
                                                                            <span className='text-base text-left text-gray-900 focus:outline-none'>
                                                                                {location.wfContent?.name}
                                                                            </span>
                                                                            <span className='text-left text-gray-600 text-xs tracking-widest uppercase truncate focus:outline-none'>
                                                                                {location.wfContent?.houseName}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Listbox.Option>
                                                        )
                                                    })}
                                                </Disclosure.Panel>
                                            </div>
                                        )}
                                    </Disclosure>

                                ))}
                            </Listbox.Options>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    )
}

export default Space;