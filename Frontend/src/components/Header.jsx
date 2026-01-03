import React, { useState } from "react";
import DeleteContact from "./DeleteContact";
import { MenuIcon } from "../Helper/SvgIcons";

export default function Header({ onAdd, selected, setSelected, setContacts }) {
  // show delete menu
  const [showDelete, setShowDelete] = useState(null)

  // download eexported 
  async function ExportContacts(){
    try {
    const res = await fetch("https://contact-manager-4862.up.railway.app/export", {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
    const data = await res.blob();

    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed", err);
  }
  }

  return (
    <section className="flex items-center justify-between mb-6">
      {selected.length == 0 && <h1 className="text-2xl font-semibold">Contacts</h1>}
      {selected.length > 0 && <div className="flex gap-5 items-center">
        <svg onClick={() => setSelected([])} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:scale-120 cursor-pointer active:scale-85 transition duration-150">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <h1 className="text-2xl font-semibold">{selected.length} Selected</h1>
      </div>}

      <div className="flex gap-3 relative">
        {/* {selected.length != 0 && <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 active:scale-85 transition-all duration-150">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export
        </button>} */}
        {/* menu for shorter screen */}

        
        {selected.length == 0 && <button onClick={ExportContacts} className="w-full sm:w-max px-4 py-2 sm:py-0 rounded-lg bg-teal-600 text-white hover:bg-teal-700 cursor-pointer flex items-center gap-2 active:scale-85 transition-all duration-150 ">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          Import /  */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span className="hidden sm:block">

          Export
          </span>
        </button>}

        {selected.length == 0 && <button
          onClick={onAdd}
          className="px-4 py-2 w-max rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 active:scale-85 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden sm:block">
          Add Contact
          </span>
        </button>}
         
        {selected.length == 0 && <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="relative transition-all border-none py-2 duration-150 border px-2 cursor-pointer rounded-lg bg-gray-700 dark:bg-white active:scale-85"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path className="block dark:hidden stroke-white fill-white" strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            <path className="dark:block hidden stroke-black fill-black" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>}
         
          {/* delete button on multiple selected */}
        {selected.length != 0 && <button
          onClick={() => setShowDelete(true)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer flex items-center gap-2 active:scale-85 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Delete
        </button>}

      </div>
      {
        showDelete != null && <DeleteContact contactList={selected} setSelected={setSelected} setDeleteContact={setShowDelete} setContacts={setContacts} />
      }
    </section>
  );
}
