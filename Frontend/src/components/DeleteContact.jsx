import React, { useState } from 'react'
import axios from 'axios';
import ContactCard from './ContactCard';

const DeleteContact = ({contactList, setDeleteContact, setContacts, setSelected}) => {
  const handleDelete = async () => {
    for(var id of contactList){
      await axios.delete(`https://4a2874e825a0.ngrok-free.app/contacts/${id}`, {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
      setContacts(contacts=>contacts.filter(c => c._id !== id));
    }
    setDeleteContact(null)
    if(setSelected!=null){
      setSelected([])
    }
  };

  const [index,setIndex] = useState(0)

  return (
    <section className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000]'>
      <div onClick={()=>setDeleteContact(null)} className='absolute bg-black/20 w-full h-full top-0 left-0 backdrop-blur-xs'></div>
      <aside className='relative'>
        <div class="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5  border border-gray-200">
    <div class="flex items-center justify-center p-4 bg-red-100 rounded-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <h2 class="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
    <p class="text-sm text-gray-600 mt-2 text-center">
        Do you really want to delete {contactList.length} contact? This action<br/>cannot be undone.
    </p>
    <div className='max-w-2xl flex flex-col overflow-x-auto mt-5'>
    <ContactCard
      key={contactList[index].id}
      name={contactList[index].name}
      email={contactList[index].email}
      phone={contactList[index].phone}
      message={contactList[index].message}
    />
    {/* show navigation here */}
    <div className='flex gap-2 mt-10 justify-center mb-5'>
      {contactList.map((value,ind)=>(
        <p onClick={()=>setIndex(ind)} className={`w-2 h-2 rounded-full cursor-pointer hover:scale-125 transition duration-150 ${ind==index ? "bg-blue-500":"bg-gray-300"}`}></p>
      ))}
    </div>
    </div>
    <div class="flex items-center justify-center gap-4 mt-3 w-full">
        <button onClick={()=>setDeleteContact(null)} type="button" class="cursor-pointer w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
            Cancel
        </button>
        <button onClick={handleDelete} type="button" class="cursor-pointer w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition">
            Confirm
        </button>
    </div>
</div>
      </aside>
    </section>
  )
}

export default DeleteContact
