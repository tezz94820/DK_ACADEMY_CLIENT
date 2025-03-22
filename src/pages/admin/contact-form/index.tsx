import axiosClient from '@/axios/axiosClient';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type contactFormType = {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    message: string,
    called: boolean,
    date: string,
}[];

const ContactForm = () => {
    const [contactForm, setContactForm] = useState<contactFormType>([]);
    const [filterDate, setFilterDate] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<string>('');


    const loadData = async (dateFilter = '') => {
        const response = await axiosClient.get('admin/get-contact-form', {
            params: dateFilter ? { filterDate: dateFilter } : {},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        });
        setContactForm(response.data.data);
    };

    const toggleCalledStatus = async (_id: string, currentStatus: boolean) => {
        try {
            setContactForm(prev =>
                prev.map(item =>
                    item._id === _id ? { ...item, called: !currentStatus } : item
                )
            );

            await axiosClient.put(`admin/update-contact-form/${_id}`,
                { called: !currentStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.error("Error updating status:", error);
            setContactForm(prev =>
                prev.map(item =>
                    item._id === _id ? { ...item, called: currentStatus } : item
                )
            );
        }
    };

    const handleFilterChange = (value: string) => {
        setFilterDate(value);
        loadData(value);
    };

    useEffect(() => {
        loadData();
    }, []);

    const totalEntries = contactForm.length;
    const totalCalled = contactForm.filter(item => item.called).length;

    return (
        <div className="p-4 sm:p-6 bg-gray-100 rounded-xl shadow-lg">
            {/* Summary Section */}
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg sm:text-xl font-bold">Contact Form Summary</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                    <p className="text-sm sm:text-lg"><strong>Total Entries:</strong> {totalEntries}</p>
                    <p className="text-sm sm:text-lg"><strong>Total Called:</strong> {totalCalled}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <button onClick={() => handleFilterChange('today')} className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded">Today</button>
                <button onClick={() => handleFilterChange('yesterday')} className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded">Yesterday</button>
                <input
                    type="date"
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 border rounded"
                />
            </div>

            {/* Table - Mobile Scrollable */}
            <div className="overflow-x-auto">
                <motion.table
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full border-collapse overflow-hidden rounded-lg shadow-md"
                >
                    <thead>
                        <tr className="bg-blue-500 text-white text-sm sm:text-base">
                            <th className="p-2 sm:p-3 text-left">Sr.No</th>
                            <th className="p-2 sm:p-3 text-left">Called</th>
                            <th className="p-2 sm:p-3 text-left">Date</th>
                            <th className="p-2 sm:p-3 text-left">First Name</th>
                            <th className="p-2 sm:p-3 text-left">Last Name</th>
                            <th className="p-2 sm:p-3 text-left">Email</th>
                            <th className="p-2 sm:p-3 text-left">Phone</th>
                            <th className="p-2 sm:p-3 text-left">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactForm.map((item, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-200 transition-colors" : "bg-gray-100 hover:bg-gray-200 transition-colors"}
                            >
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{index + 1}</td>
                                <td className="p-2 sm:p-3 border-b text-center">
                                    <motion.input
                                        type="checkbox"
                                        checked={item.called}
                                        onChange={() => toggleCalledStatus(item._id, item.called)}
                                        className="w-4 h-4 sm:w-5 sm:h-5 accent-green-500 cursor-pointer"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                </td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{item.date}</td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{item.first_name}</td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{item.last_name}</td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{item.email}</td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">{item.phone}</td>
                                <td className="p-2 sm:p-3 border-b text-xs sm:text-sm">
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={() => setSelectedMessage(item.message)}
                                    >
                                        {item.message.length > 20 ? item.message.slice(0, 20) + '...' : item.message}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </div>
            
            {selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-lg font-bold">Full Message</h3>
                        <p className="mt-2 text-gray-700 break-words">{selectedMessage}</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto" 
                            onClick={() => setSelectedMessage('')}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ContactForm;