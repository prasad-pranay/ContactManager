import React, { useEffect, useState } from "react";
import DeleteContact from "./DeleteContact";
import { CopyIcon, EditIcon, FlagIcon, MailIcon, MenuIcon, MessageIcon, PhoneIcon, TrashIcon } from "../Helper/SvgIcons";
import EditContactModal from "./EditContactModal";
import { toast } from "react-toastify";

const ListCard = ({fetchContacts,contact,setSelected,selected,disableAction,setDeleteContact})=>{
  // show menu
  const [showMenu,setShowMenu] = useState(false)
  // edit screen
  const [showEdit, setShowEdit] = useState(null);
  return <>
  <div className={`${showMenu && "bg-black/20 dark:bg-black/40 backdrop-blur-xs sm:hidden fixed w-screen h-screen top-0 left-0"}`} onClick={()=>setShowMenu(false)} ></div>
  <div
          key={contact._id}
          className={`${showMenu && "z-[15000] relative sm:pointer-events-none sm:hidden"}  flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm hover:shadow-md transition duration-150`}
        >
          {/* the logo for each list item and select button also */}
          <p className={`w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition duration-150 active:scale-85 ${selected.some(value => value._id == contact._id) ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-zinc-900"}`} onClick={() => {
            if (selected.some(value => value._id == contact._id)) {
              setSelected(prev => prev.filter(id => id != contact))
            } else {
              setSelected(prev => [...prev, contact])
            }
          }}>
            <span className="capitalize text-inherit">{selected.some(value => value._id == contact._id) ? "✓" : contact.name.charAt(0)}</span>
          </p>
          <div className="flex-1">
            <p className="font-medium text-2xl">{contact.name}</p>
            <div className="flex sm:gap-10 flex-col sm:flex-row">

              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MailIcon className="size-3.5" />
                {contact.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <PhoneIcon className="size-3.5" />
                {contact.phone}
              </p>
            </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MessageIcon className="size-3" /> {contact.message.length >0 ? contact.message : "N|A"}</p>
          </div>
          {/* action buttons */}
          {/* <div className="flex gap-3 text-lg"> */}
          <div className="relative">

        <div className={`flex gap-x-3 bg-[#F8FAFB] dark:bg-zinc-900 sm:dark:bg-transparent sm:bg-transparent sm:shadow-none shadow-lg px-5 py-5 sm:py-0 sm:px-0 rounded flex-row absolute sm:relative right-0 sm:top-0 top-13 z-[1500] sm:z-[10] ${!showMenu && "scale-0 opacity-0 sm:opacity-100 sm:scale-100"}`}>
            <button onClick={() => {
              const { _id, __v, createdAt, updatedAt, ...rest } = contact;
              navigator.clipboard.writeText(JSON.stringify(rest));
              toast.success(`Details of ${contact.name} copied Successfully.`);
              setShowMenu(false);
            }} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none "} hover:bg-blue-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Copy</span>
              <CopyIcon className="size-6" />
            </button>
            <button onClick={() => {setShowMenu(false),setShowEdit(contact)}} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-teal-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Edit</span>

              <EditIcon className="size-6" />
            </button>
            <button disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-red-600 bg-red-400 px-2 py-2 rounded-lg text-white cursor-pointer active:scale-85 transition group duration-150 relative`} onClick={() => {setShowMenu(false);setDeleteContact(contact)}}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-red-500 text-white  rounded-md px-2 py-1 text-xs transition duration-150">Delete</span>
              <TrashIcon className="size-6" />
            </button>
          </div>
          <button
          onClick={() => setShowMenu(prev=>!prev)}
          className="block sm:hidden relative transition-all border-none py-2 duration-150 border px-2 cursor-pointer rounded-lg bg-gray-300 dark:bg-gray-700 active:scale-85"
          >
          <MenuIcon className="size-6" / >
        </button>
          </div>
        </div>
        {showEdit != null && (
        <EditContactModal
          contact={showEdit}
          onClose={() => setShowEdit(null)}
          onUpdate={fetchContacts}
        />
      )}
        </>
}

export default function ContactList({ fetchContacts, contacts, setContacts, selected, setSelected }) {
  // provide contact id here if want to delete
  const [deleteContact, setDeleteContact] = useState(null)
  // disable action button
  const [disableAction, setDisableAction] = useState(false);
  // show edit modal
  

  // set actions when seelcted is greater
  useEffect(() => {
    if (selected.length > 0) {
      setDisableAction(true)
    } else {
      setDisableAction(false)
    }
  }, [selected])

  return (
    <section className="space-y-3 h-full overflow-y-auto overflow-x-hidden pr-1 sm:pr-4 pt-5  pl-1">
      {contacts.map((contact,index) => (
        <ListCard fetchContacts={fetchContacts} contact={contact} setSelected={setSelected} selected={selected} disableAction={disableAction} setDeleteContact={setDeleteContact} />
      ))}
      {contacts.length == 0 && <div className="flex gap-5 items-center justify-center h-full pb-35">
        <FlagIcon className="size-20" />
        <h1 className="text-3xl">No Contacts here</h1>
      </div>}
      {
        deleteContact != null && <DeleteContact contactList={[deleteContact]} setDeleteContact={setDeleteContact} setContacts={setContacts} />
      }

      

    </section>
  );
}
