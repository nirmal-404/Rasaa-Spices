import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, fetchAllContacts } from "@/store/admin/contact-slice/contactSlice";

function ContactList() {
  const dispatch = useDispatch();
  const { contactList, isLoading } = useSelector((state) => state.userContacts);



  function handleDelete(contactId) {
    dispatch(deleteContact(contactId)).then((data) => {
        console.log("im here", data.payload)
      if (data?.payload?.success) {

        dispatch(fetchAllContacts());
      } else {
        console.error("Failed to delete contact");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);



  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Contact List</h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-500 animate-pulse">Loading contacts...</p>
        </div>
      ) : contactList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactList.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {contact.type}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Email:</span> {contact.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Phone:</span> {contact.phone}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Message:</span> {contact.message}
                </p>
              </div>
              <button
                onClick={() => handleDelete(contact.id)}
                className="mt-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-500">No contacts found.</p>
        </div>
      )}
    </div>
  );
}

export default ContactList;
