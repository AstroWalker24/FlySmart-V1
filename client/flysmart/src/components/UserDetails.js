import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const UserDetails = () => {
    const [additionalMobile, setAdditionalMobile] = useState(false);
    const [passengerForms, setPassengerForms] = useState([]);
    const [showPassengerForm, setShowPassengerForm] = useState(false);

    const handleAddMobile = () => {
        setAdditionalMobile(true);
    };

    const handleRemoveMobile = () => {
        setAdditionalMobile(false);
    };

    const handleAddPassenger = () => {
        setPassengerForms([...passengerForms, { firstName: '', lastName: '', dob: '', gender: '' }]);
        setShowPassengerForm(true);
    };

    const handleRemovePassenger = (index) => {
        const updatedForms = passengerForms.filter((_, i) => i !== index);
        setPassengerForms(updatedForms);
    };

    const handlePassengerChange = (index, event) => {
        const { name, value } = event.target;
        const updatedForms = passengerForms.map((form, i) =>
            i === index ? { ...form, [name]: value } : form
        );
        setPassengerForms(updatedForms);
    };

    const handleUserSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const street = form.street.value.trim();
        const zipCode = form.zipCode.value.trim();
        const city = form.city.value.trim();
        const state = form.state.value.trim();
        const country = form.country.value.trim();
        const mobileNumber = form.mobileNumber.value.trim();
        const additionalMobileNumber = additionalMobile ? form.additionalMobileNumber.value.trim() : '';
        const email = form.email.value.trim();
        const gender = form.gender.value.trim();
        const dob = form.dob.value.trim();

        if (!firstName || !lastName || !street || !zipCode || !city || !state || !country || !mobileNumber || !email || !gender || !dob) {
            toast.error('Please fill in all the fields.');
            return;
        }

        if (!/^\d{10}$/.test(mobileNumber)) {
            toast.error('Mobile number must be exactly 10 digits.');
            return;
        }

        if (additionalMobile && additionalMobileNumber && !/^\d{10}$/.test(additionalMobileNumber)) {
            toast.error('Additional mobile number must be exactly 10 digits.');
            return;
        }

        toast.success('User details submitted successfully!');
        // Add form submission logic here
    };

    const handlePassengerSubmit = (event) => {
        event.preventDefault();

        for (let passenger of passengerForms) {
            if (!passenger.firstName || !passenger.lastName || !passenger.dob || !passenger.gender) {
                toast.error('Please fill in all passenger details.');
                return;
            }
        }

        toast.success('Passenger details submitted successfully!');
        // Add form submission logic here
    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={handleAddPassenger}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Passenger Details
                </button>
            </div>
            <div className={`relative flex transition-all duration-500 ${showPassengerForm ? 'justify-start' : 'justify-center'} w-full max-w-6xl`}>
                <div className={`bg-white shadow-md rounded-lg p-6 transition-transform duration-500 ${showPassengerForm ? 'transform -translate-x-1/4' : ''} w-full max-w-xl`}>
                    <h2 className="text-2xl font-semibold text-center mb-6">User Details</h2>
                    <form onSubmit={handleUserSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">
                                Street Address
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="zipCode" className="block text-gray-700 font-semibold mb-2">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobileNumber" className="block text-gray-700 font-semibold mb-2">
                                Mobile Number
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleAddMobile}
                                    className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        {additionalMobile && (
                            <div className="mb-4">
                                <label htmlFor="additionalMobileNumber" className="block text-gray-700 font-semibold mb-2">
                                    Additional Mobile Number
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="tel"
                                        id="additionalMobileNumber"
                                        name="additionalMobileNumber"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveMobile}
                                        className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {showPassengerForm && (
                    <div className="bg-white shadow-md rounded-lg p-6 ml-8 w-full max-w-lg transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-center mb-6">Passenger Details</h2>
                        <form onSubmit={handlePassengerSubmit}>
                            {passengerForms.map((form, index) => (
                                <div key={index} className="mb-4 border p-4 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-lg font-semibold">Passenger {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePassenger(index)}
                                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor={`passengerFirstName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`passengerFirstName-${index}`}
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`passengerLastName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`passengerLastName-${index}`}
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={(event) => handlePassengerChange(index, event)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passengerDob-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id={`passengerDob-${index}`}
                                            name="dob"
                                            value={form.dob}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`passengerGender-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Gender
                                        </label>
                                        <select
                                            id={`passengerGender-${index}`}
                                            name="gender"
                                            value={form.gender}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit Passenger Details
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserDetails;
