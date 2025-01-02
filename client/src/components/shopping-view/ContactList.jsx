import { fetchContacts } from '@/store/shop/contactSlice';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
function ContactList() {
    const dispatch = useDispatch();
    const { contacts, loading, error } = useSelector((state) => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts());

    }, [dispatch]);

    if (loading) {
        return <p className="text-center text-blue-500 font-medium">Loading contacts...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 font-medium">Something went wrong: {error}</p>;
    }
    console.log(contacts,"hello2......")
    // Safety check to ensure contacts is an array
    console.log("length is ",contacts.length)
    if (!Array.isArray(contacts) || contacts.length === 0) {
        console.log("length is ",contacts.length)
        return <p className="text-center text-gray-500 font-medium">No contacts available.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Customer Contacts</h1>
            <div className="grid grid-cols-1 gap-4">

                {contacts.map((contact) => (
                    <div key={contact.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                        <p className="text-lg font-semibold text-gray-800">
                            <span className="font-bold">Email:</span> {contact.email}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Phone:</span> {contact.phone}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Type:</span> {contact.type}
                        </p>
                        <p className="text-lg text-gray-600">
                            <span className="font-bold">Message:</span> {contact.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactList;
