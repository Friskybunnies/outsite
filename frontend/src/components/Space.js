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
                        <div className="mt-1 relative">
                            <Listbox.Button className='w-full bg-white pl-3 border border-gray-300 rounded-md shadow-sm py-2 text-left cursor-pointer text-sm'>
                                <span className="w-full inline-flex">
                                    <span className="">{props.selectedPlaceName}</span>
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} transition duration-500 h-5 w-5 text-gray-400`} />
                                </span>
                            </Listbox.Button>
                            <Transition show={open} leave="transition-opacity ease-in duration-150" leaveFrom="opacity-90" leaveTo="opacity-0">
                            </Transition>
                            <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto text-sm">
                                {Object.keys(placeGroups).map((group) => (
                                    <Disclosure key={group} defaultOpen={false} className="">
                                        {({ open }) => (
                                            <div>
                                                <Disclosure.Button className="flex text-left text-lg justify-between w-full px-4 py-2 text-gray-900">
                                                    <span>{group}</span>
                                                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} h-5 w-5`} />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 pb-2 text-gray-500">
                                                    {props.locations.filter(location => location.region === group).map(location => {
                                                        return (
                                                            <Listbox.Option key={location.id} className={({ active, selected }) => classNames(active ? 'cursor-pointer bg-gray-100' : 'cursor-default', 'relative py-1 pl-8 pr-4')} value={location} onClick={getSelectedPlace}>
                                                                {({ selected }) => (
                                                                    <div>
                                                                        <div className="flex flex-col">
                                                                            <span className='text-base text-left text-gray-900'>
                                                                                {location.wfContent?.name}
                                                                            </span>
                                                                            <span className='text-left text-gray-600 text-xs tracking-widest uppercase truncate'>
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