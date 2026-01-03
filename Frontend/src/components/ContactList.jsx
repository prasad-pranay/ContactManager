import React, { useEffect, useState } from "react";
import DeleteContact from "./DeleteContact";
import { CopyIcon, EditIcon, FlagIcon, MailIcon, PhoneIcon, TrashIcon } from "../Helper/SvgIcons";
import EditContactModal from "./EditContactModal";
import { toast } from "react-toastify";

export default function ContactList({ fetchContacts, contacts, setContacts, selected, setSelected }) {
  // provide contact id here if want to delete
  const [deleteContact, setDeleteContact] = useState(null)
  // disable action button
  const [disableAction, setDisableAction] = useState(false);
  // show edit modal
  const [showEdit, setShowEdit] = useState(null);

  // set actions when seelcted is greater
  useEffect(() => {
    if (selected.length > 0) {
      setDisableAction(true)
    } else {
      setDisableAction(false)
    }
  }, [selected])

  return (
    <section className="space-y-3 h-full overflow-y-auto overflow-x-hidden pr-4 pt-5 pl-1">
      {contacts.map(contact => (
        <div
          key={contact._id}
          className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm hover:shadow-md transition duration-150"
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
            <div className="flex gap-10">

              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MailIcon className="size-3.5" />
                {contact.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <PhoneIcon className="size-3.5" />
                {contact.phone}
              </p>
            </div>
          <p>{contact.message}</p>
          </div>
          {/* action buttons */}
          <div className="flex gap-3 text-lg">
            <button onClick={() => {
              const { _id, __v, createdAt, updatedAt, ...rest } = contact;
              navigator.clipboard.writeText(JSON.stringify(rest));
              toast.success(`Details of ${contact.name} copied Successfully.`);
            }} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-blue-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Copy</span>
              <CopyIcon className="size-6" />
            </button>
            <button onClick={() => setShowEdit(contact)} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-teal-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Edit</span>

              <EditIcon className="size-6" />
            </button>
            <button disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-red-600 bg-red-400 px-2 py-2 rounded-lg text-white cursor-pointer active:scale-85 transition group duration-150 relative`} onClick={() => setDeleteContact(contact)}>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-red-500 text-white  rounded-md px-2 py-1 text-xs transition duration-150">Delete</span>
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
      ))}
      {contacts.length == 0 && <div className="flex gap-5 items-center justify-center h-full pb-35">
        <FlagIcon className="size-20" />
        <h1 className="text-3xl">No Contacts here</h1>
      </div>}
      {
        deleteContact != null && <DeleteContact contactList={[deleteContact]} setDeleteContact={setDeleteContact} setContacts={setContacts} />
      }

      {showEdit != null && (
        <EditContactModal
          contact={showEdit}
          onClose={() => setShowEdit(null)}
          onUpdate={fetchContacts}
        />
      )}

    </section>
  );
}
