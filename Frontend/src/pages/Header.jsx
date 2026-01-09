import React, { useState } from "react";
import DeleteContact from "../components/DeleteContact";
import {  SearchIcon } from "../Helper/SvgIcons";

export default function Header({ onAdd, selected, setSelected, setContacts,search,setSearch,setShowSidebar }) {
  // show delete menu
  const [showDelete, setShowDelete] = useState(null)

  return (
    <section className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:flex items-center justify-between bg-[var(--sidebar)] shadow-sm rounded-2xl py-5 px-5 mx-5 mt-5">
      {selected.length == 0 && <>
      <div className="flex w-full gap-5">
      <h1 className="text-2xl font-light flex gap-4 items-center mr-auto"> <img src="/icon.png" alt="" className="h-10" /> Contact <span className="hidden md:block">Manager</span></h1>
      <button
          onClick={onAdd}
          className="md:hidden px-4 py-2 w-max border border-[var(--border)] cursor-pointer rounded-lg bg-[var(--card)] dark:hover:bg-indigo-700 hover:bg-indigo-500 hover:text-white flex items-center gap-2 active:scale-85 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="">
          Add
          </span>
        </button> 
      <button
          onClick={()=>setShowSidebar(true)}
          className="md:hidden px-4 py-2 w-max border border-[var(--border)] cursor-pointer rounded-lg bg-[var(--card)] dark:hover:bg-indigo-700 hover:bg-indigo-500 hover:text-white flex items-center gap-2 active:scale-85 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

        </button> 
      </div>
      </>
      }
      {selected.length > 0 && <div className="flex gap-5 items-center">
        <svg onClick={() => setSelected([])} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:scale-120 cursor-pointer active:scale-85 transition duration-150">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <h1 className="text-2xl font-semibold">{selected.length} Selected</h1>
      </div>}

      <div className="flex gap-3 relative w-full">
        {/* when none selected */}
        {selected.length == 0 && 
        <>
        <button
          onClick={onAdd}
          className="md:flex whitespace-nowrap hidden px-4 py-2 w-max border border-[var(--border)] cursor-pointer rounded-lg bg-[var(--card)] dark:hover:bg-indigo-700 hover:bg-indigo-500 hover:text-white flex items-center gap-2 active:scale-85 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="hidden md:block">
          Add Contact
          </span>
        </button> 
        <div className="relative flex w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-800
                  text-zinc-800 dark:text-white
                  placeholder-zinc-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  hover:border-indigo-400
                  transition-all duration-200"
                />
              </div>
        <button
          onClick={() => {
            document.documentElement.classList.toggle("dark")
            if(document.documentElement.classList.contains("dark")){
              localStorage.setItem("theme","dark")
            }else{
              localStorage.setItem("theme","light")
            }
          }}
          className="relative transition-all py-2 duration-150 border px-2 cursor-pointer rounded-lg bg-[var(--card)] border-1 border-[var(--border)] active:scale-85"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path className="block dark:hidden stroke-black" strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            <path className="dark:block hidden stroke-white" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>
        </>
        
        }
         
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
