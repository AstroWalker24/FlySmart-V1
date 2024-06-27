import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom';

const PaymentPage = () => {
    const [balance, setBalance] = useState(10000);
    const [flightCost, setFlightCost] = useState(null); // Initialize flightCost as null
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state
    const [selectedCoupon, setSelectedCoupon] = useState(null); // State to store selected coupon
    const [discount, setDiscount] = useState(0);
    const [coupons, setCoupons] = useState([]);

    const location = useLocation();
    const balance_data = location.state.response || 0;

    useEffect(() => {
        // Simulating a backend API call to fetch flight cost
        setTimeout(() => {
            const fetchedFlightCost = 200; // Replace with your actual backend API call to fetch flight cost
            setFlightCost(fetchedFlightCost);
            setIsLoading(false); // Set loading state to false after fetching data
        }, 1000); // Simulating delay of 1 second for API call

        // Simulating a backend API call to fetch coupon data
        setTimeout(() => {
            const fetchedCoupons = [
                { id: 1, title: "50 units Discount", description: "Apply this coupon to get 50 units off your flight booking.", value: 50 },
                { id: 2, title: "100 units Discount", description: "Apply this coupon to get 100 units off your flight booking.", value: 100 },
                { id: 3, title: "Free Upgrade", description: "Apply this coupon to get a free upgrade to business class.", value: null } // null value can be handled for special coupons
            ];
            setCoupons(fetchedCoupons);
        }, 1500); // Simulating delay of 1.5 seconds for API call to fetch coupons
    }, []);

    const handleBookFlight = () => {
        const finalCost = flightCost - discount;
        if (!flightCost || flightCost <= 0) {
            toast.error('Please enter a valid flight cost.');
            return;
        }

        if (finalCost > balance) {
            toast.error('Insufficient balance. Please add funds.');
            return;
        }

        setBalance(balance - finalCost);
        toast.success('Flight booked successfully!');
    };

    const handleCouponChange = (value, title) => {
        if (selectedCoupon === value) {
            // Deselect coupon if it's already selected
            setSelectedCoupon(null);
            setDiscount(0);
            toast.info(`Coupon "${title}" removed.`);
        } else {
            // Select new coupon
            setSelectedCoupon(value);
            setDiscount(value);
            toast.success(`Coupon "${title}" applied successfully!`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md p-6 mx-auto mt-8 max-w-3xl rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Payment Page</h2>
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 mb-4 rounded-md">
                    Current Balance: {balance_data} units
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Flight Cost:
                    </label>
                    <div className="text-gray-900 font-bold">
                        {isLoading ? 'Loading...' : `${flightCost} units`}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded-md">
                        Total Cost: {isLoading ? 'Loading...' : `${flightCost - discount} units`}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleBookFlight}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Book Flight
                    </button>
                </div>
            </div>
            <div className="bg-gray-200 py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold mb-4">Available Coupons</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {coupons.map(coupon => (
                            <CouponCard
                                key={coupon.id}
                                title={coupon.title}
                                description={coupon.description}
                                onClick={() => handleCouponChange(coupon.value, coupon.title)}
                                selected={selectedCoupon === coupon.value}
                                value={coupon.value} // Pass value to the CouponCard
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

const CouponCard = ({ title, description, onClick, selected, value }) => {
    const [buttonColor, setButtonColor] = useState(selected ? 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500');

    useEffect(() => {
        // Update button color when selected changes
        setButtonColor(selected ? 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500');
    }, [selected]);

    const handleButtonClick = () => {
        onClick(); // Handle coupon click

        // Update button color after click
        setButtonColor(selected ? 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500');
    };

    return (
        <div className={`bg-white overflow-hidden shadow rounded-lg ${selected ? 'border-2 border-blue-500' : ''}`}>
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
                <button
                    onClick={handleButtonClick}
                    className={`mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${buttonColor}`}
                >
                    {selected && value !== null ? 'Cancel Coupon' : 'Apply Coupon'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
