import React, { useEffect, useState } from "react";
import DeleteContact from "../components/DeleteContact";
import { AllMailIcon, BookIcon, CopyIcon, EditIcon, FlagIcon, MailIcon, MenuIcon, MessageIcon, PhoneIcon, TrashIcon, UserIcon } from "../Helper/SvgIcons";
import EditContactModal from "../components/EditContactModal";
import { toast } from "react-toastify";

const ListCard = ({ fetchContacts, contact, setSelected, selected, disableAction, setDeleteContact }) => {
  // show menu
  const [showMenu, setShowMenu] = useState(false)
  // edit screen
  const [showEdit, setShowEdit] = useState(null);
  return <>
    <div className={`${showMenu ? "block" : "hidden"}  bg-black/20 dark:bg-black/40 backdrop-blur-xs z-[12000] fixed w-screen h-screen top-0 left-0`} onClick={() => setShowMenu(false)} ></div>
    <div
      onClick={() => { if (showMenu) { setShowMenu(false) } }}
      key={contact._id}
      className={`${showMenu && "z-[15000]"}  relative grid grid-cols-[max-content_1fr_max-content] items-center gap-4 p-4 rounded-xl bg-[var(--card)] dark:hover:bg-[#212529] border-1 border-[var(--border)]/40 hover:border-[var(--border)]/100 transition duration-100`}
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
      {/* middel info */}
      <div className="grid md:grid-cols-1 lg:grid-cols-[35%_35%_30%] xl:grid-cols-[50%_25%_25%]">
        <p className="font-light text-2xl">{contact.name}</p>
        {/* <div className="flex sm:gap-10 flex-col sm:flex-row"> */}

        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <MailIcon className="size-3.5" />
          {contact.email}
        </p>
        <p className="text-xs mt-1 md:mt-0 text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <PhoneIcon className="size-3.5" />
          {contact.phone}
        </p>
        {/* </div> */}
        <p className="text-xs md:col-span-3 text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MessageIcon className="size-3" /> {contact.message.length > 0 ? contact.message : "N|A"}</p>
      </div>
      {/* action buttons */}
      <div className="relative">

        <div className={`flex gap-x-3 bg-[#F8FAFB] dark:bg-zinc-900 sm:dark:bg-transparent sm:bg-transparent sm:shadow-none shadow-lg px-5 py-5 sm:py-0 sm:px-0 rounded flex-row absolute right-0 top-13 z-[1500] sm:z-[10] ${!showMenu && "scale-0 opacity-0"}`}>
          <button onClick={() => {
            const { _id, __v, createdAt, updatedAt, ...rest } = contact;
            navigator.clipboard.writeText(JSON.stringify(rest));
            toast.success(`Details of ${contact.name} copied Successfully.`);
            setShowMenu(false);
          }} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none "} hover:bg-blue-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
            <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Copy</span>
            <CopyIcon className="size-6" />
          </button>
          <button onClick={() => { setShowMenu(false), setShowEdit(contact) }} disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-teal-500 hover:text-white bg-gray-300 dark:bg-gray-500 px-2 py-2 rounded-lg cursor-pointer active:scale-85 transition group duration-150 relative`}>
            <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white dark:bg-white dark:text-black rounded-md px-2 py-1 text-xs transition duration-150">Edit</span>

            <EditIcon className="size-6" />
          </button>
          <button disabled={disableAction} className={`${disableAction && "opacity-50 pointer-events-none"} hover:bg-red-600 bg-red-400 px-2 py-2 rounded-lg text-white cursor-pointer active:scale-85 transition group duration-150 relative`} onClick={() => { setShowMenu(false); setDeleteContact(contact) }}>
            <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-red-500 text-white  rounded-md px-2 py-1 text-xs transition duration-150">Delete</span>
            <TrashIcon className="size-6" />
          </button>
        </div>
        <button
          onClick={() => setShowMenu(prev => !prev)}
          className="block relative transition-all border-none py-2 duration-150 border px-2 cursor-pointer rounded-lg bg-[var(--sidebar)] hover:scale-105 active:scale-85"
        >
          <MenuIcon className="size-6" />
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


const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {
  return (
    <aside className="absolute bottom-0 flex justify-between w-full items-center bg-[var(--sidebar)]">
      <div className="flex items-center gap-5 justify-between mr-5 w-full md:max-w-80 text-gray-500 font-medium ">
        <button type="button" aria-label="prev" className="border border-[var(--border)] rounded-lg bg-[var(--card)] cursor-pointer hover:scale-105 active:scale-95 transition duration-100" onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
          }
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${currentPage == 1 ? "fill-[#475569] stroke-[#475569]" : "fill-[var(--text-primary)]"}`}>
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" strokeWidth=".078" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-sm font-medium">
          {totalPage.map((value, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`h-10 w-10 flex items-center justify-center aspect-square transition duration-150 cursor-pointer hover:scale-105 active:scale-95  ${currentPage == index + 1 ? "text-indigo-500 border border-indigo-200 rounded-full" : "hover:text-[var(--text-primary)]"}`}>{index + 1}</button>
          ))}
        </div>

        <button type="button" aria-label="next" className="border border-[var(--border)] rounded-lg bg-[var(--card)] cursor-pointer hover:scale-105 active:scale-95 transition duration-100" onClick={() => {
          if (currentPage < totalPage.length) {
            setCurrentPage(prev => prev + 1)
          }
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${currentPage == totalPage.length ? "fill-[#475569] stroke-[#475569]" : "fill-[var(--text-primary)]"} rotate-180`}>
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" strokeWidth=".078" />
          </svg>
        </button>
      </div>
      <p className="text-[var(--text-light)] text-sm md:block hidden mr-5">{currentPage} Out of {totalPage.length} Page</p>
    </aside>
  );
};

export default function ContactList({setFilters, fetchContacts, contacts, setContacts, selected, setSelected, filters }) {
  // provide contact id here if want to delete
  const [deleteContact, setDeleteContact] = useState(null)
  // disable action button
  const [disableAction, setDisableAction] = useState(false);
  // show edit modal

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState([0])

  // set actions when seelcted is greater
  useEffect(() => {
    if (selected.length > 0) {
      setDisableAction(true)
    } else {
      setDisableAction(false)
    }
  }, [selected])

  useEffect(() => {
    const totalPages = Math.ceil(contacts.length / 4);
    setTotalPage(Array(totalPages).fill(0))
  }, [contacts])


  return (
    <section className="h-full overflow-hidden relative pb-13">
      <div className="flex flex-col h-full overflow-y-auto pr-4 minimal-sidebar gap-4">
        {contacts.slice((currentPage - 1) * 4, currentPage + 3).map((contact, index) => (
          <ListCard key={index} fetchContacts={fetchContacts} contact={contact} setSelected={setSelected} selected={selected} disableAction={disableAction} setDeleteContact={setDeleteContact} />
        ))}
        {contacts.length == 0 && <div className="flex flex-col gap-5 items-center justify-center h-full pb-15">
          <div className="flex md:flex-row flex-col gap-5 items-center">

            <FlagIcon className="size-20" />
            <h1 className="text-5xl font-thin text-center">No Contacts here</h1>
          </div>

              <h2>Try removing one of the filters</h2>
          <div className="flex gap-10">
            {(filters["ownership"] != "" || filters["mail"] != "" || filters["priority"] != "") && <>
              {filters["ownership"] != "" && <div onClick={()=>setFilters(prev=>({...prev,"ownership":""}))} className="bg-[var(--card)] flex px-10 py-5 rounded-xl gap-5 hover:bg-red-500 cursor-pointer active:scale-95 transition duration-150">
                <UserIcon />
                <p>Ownership</p>
              </div>}
              {filters["mail"] != "" && <div onClick={()=>setFilters(prev=>({...prev,"mail":""}))} className="bg-[var(--card)] flex px-10 py-5 rounded-xl gap-5 hover:bg-red-500 cursor-pointer active:scale-95 transition duration-150">
                <AllMailIcon />
                <p>Mail</p>
              </div>}
              {filters["priority"] != "" && <div onClick={()=>setFilters(prev=>({...prev,"priority":""}))} className="bg-[var(--card)] flex px-10 py-5 rounded-xl gap-5 hover:bg-red-500 cursor-pointer active:scale-95 transition duration-150">
                <BookIcon />
                <p>Priority</p>
              </div>}
            </>}
          </div>
        </div>}
      </div>

              {contacts.length > 0 &&
      <Pagination totalPage={totalPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
              }
      {
        deleteContact != null && <DeleteContact contactList={[deleteContact]} setDeleteContact={setDeleteContact} setContacts={setContacts} />
      }
    </section>
  );
}
