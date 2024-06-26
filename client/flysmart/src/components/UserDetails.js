import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';

const UserDetails = () => {
    const [additionalMobile, setAdditionalMobile] = useState(false);
    const [passengerForms, setPassengerForms] = useState([]);

    const handleAddMobile = () => {
        setAdditionalMobile(true);
    };

    const handleRemoveMobile = () => {
        setAdditionalMobile(false);
    };

    const handleAddPassenger = () => {
        setPassengerForms([...passengerForms, { firstName: '', lastName: '', dob: '', gender: '' }]);
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

    const handleSubmit = (event) => {
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

        toast.success('Form submitted successfully!');
        // Add form submission logic here
    };

    const slideAnimation = useSpring({
        transform: passengerForms.length > 0 ? 'translateX(-100%)' : 'translateX(0%)',
    });

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
            <div className="relative w-full max-w-lg">
                <animated.div style={slideAnimation} className="absolute w-full">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-center mb-6">User Details</h2>
                        <form onSubmit={handleSubmit}>
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
                                    Email ID
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
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
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
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </animated.div>
                {passengerForms.map((_, index) => (
                    <div key={index} className="relative w-full mt-12">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-center mb-6">Passenger Details</h2>
                            <form>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor={`passengerFirstName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Passenger First Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`passengerFirstName-${index}`}
                                            name="firstName"
                                            value={passengerForms[index].firstName}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`passengerLastName-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Passenger Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`passengerLastName-${index}`}
                                            name="lastName"
                                            value={passengerForms[index].lastName}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor={`passengerDob-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id={`passengerDob-${index}`}
                                            name="dob"
                                            value={passengerForms[index].dob}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`passengerGender-${index}`} className="block text-gray-700 font-semibold mb-2">
                                            Gender
                                        </label>
                                        <select
                                            id={`passengerGender-${index}`}
                                            name="gender"
                                            value={passengerForms[index].gender}
                                            onChange={(event) => handlePassengerChange(index, event)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemovePassenger(index)}
                                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Remove Passenger
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserDetails;
