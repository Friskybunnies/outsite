import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

function Guests(props) {

    const getSelectedGuests = (e) => {
        props.handleSelectedGuests(e);
    }

    return (
        <Listbox value={props.selectedGuestNumberText}>
            {({ open }) => (
                <div className="relative mt-1">
                    <Listbox.Button
                        className={
                            'w-full text-left px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm'
                        }
                        id={props.selectedGuestNumber}
                    >
                        <span className="">{props.selectedGuestNumberText ? props.selectedGuestNumberText : 'Select'}</span>
                        <span className="flex absolute inset-y-0 right-0 items-center pr-2">
                            <ChevronUpIcon
                                className={`${open ? 'transform rotate-180' : ''
                                    } transition duration-500 text-gray-400 h-5 w-5`}
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        show={open}
                        leave="transition-opacity ease-in duration-150"
                        leaveFrom="opacity-90"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full mt-1 bg-white rounded-md shadow-md max-h-80 lg:text-sm">
                            <option
                                id={1}
                                value={"One guest"}
                                onClick={getSelectedGuests}
                                className="pt-2 text-left pl-3"
                            >
                                One guest
                            </option>
                            <option
                                id={2}
                                value={"Two guests"}
                                onClick={getSelectedGuests}
                                className="py-2 text-left pl-3"
                            >
                                Two guests
                                </option>
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
}

export default Guests;