import React, { useState } from 'react'
import { AllMailIcon, BookIcon, DownIcon, GMailIcon, GroupIcon, MessageIcon, StarIcon, UpIcon, UserIcon, YahooIcon } from '../Helper/SvgIcons'
import ImportContactsModal from '../components/ImportContactModal'
import { toast } from 'react-toastify'

const SidebarDropDownOption = ({ text, Icon, value,filter,group, setFilters  }) => {
    return <p onClick={()=>setFilters(prev=>({...prev,[group]:value}))} className={`pl-5 group border-l-1 py-3 text-xs border-[var(--border)] flex items-center gap-2  ${filter[group]==value ? "dark:bg-[#212529] bg-[#f1f3f5]":"dark:hover:bg-[#212529]/30 hover:[#f1f3f5]"} cursor-pointer transition duration-150 rounded-r-lg`}>
        <Icon className="h-4" />
        <span className='group-active:scale-90 transition duration-100'>{text}</span>
    </p>
}

const SidebarDropDown = ({ heading, options, group, setFilters, filter }) => {
    const [showDropDown, setShowDropDown] = useState(true)

    return <aside>
        {/* upper title section */}
        <div className='flex items-center justify-between py-2'>
            <h1 className='text-sm font-medium'>{heading} </h1>
            {showDropDown && <DownIcon onClick={() => setShowDropDown(prev => !prev)} className="h-5 cursor-pointer transition duration-150 hover:scale-110 active:scale-95" stroke='2.2' />}
            {!showDropDown && <UpIcon onClick={() => setShowDropDown(prev => !prev)} className="h-5 cursor-pointer transition duration-150 hover:scale-110 active:scale-95" stroke='2.2' />}
        </div>
        {/* options part */}
        <div className={`flex flex-col ${showDropDown ? "scale-y-100" : "scale-y-0"} transition duration-200`}>
            {options.map((value, index) => (
                <SidebarDropDownOption filter={filter} setFilters={setFilters} group={group} text={value.text} Icon={value.icon} key={index} value={value.value} />
            ))}
        </div>
    </aside>
}
// download eexported 
async function ExportContacts() {
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
        toast.success("File Exported Successfully");
    } catch (err) {
        toast.error("Error Occurred, check console for details");
        console.error("Export failed", err);
    }
}
const Sidebar = ({filter,setFilters,contacts,showSidebar,setShowSidebar}) => {
    
    const [parsedData, setParsedData] = useState([]);

  // Email lookup for fast check
  const existingEmails = new Set(
    contacts.map(c => c.email?.toLowerCase())
  );

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!Array.isArray(data)) throw new Error();

        const processed = data.map(item => ({
          ...item,
          exists: existingEmails.has(item.email?.toLowerCase()),
        }));
        console.log(processed)
        setParsedData(processed);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }

    return (<>
    {showSidebar && <div className="fixed bg-black/20 backdrop-blur-sm w-full h-full top-0 left-0 z-[900] md:hidden" onClick={()=>setShowSidebar(false)} ></div>}
        <section className={`transition duration-150 ${showSidebar ? "translate-x-0":"-translate-x-[100%] md:translate-x-0"} z-[1000] md:relative fixed top-0 left-0 md:w-max w-[calc(100%-50px)] pl-5 pr-2 pt-5 pb-20 rounded-2xl shadow-sm h-full bg-[var(--sidebar)] min-w-[250px] flex flex-col overflow-hidden`}>
            <section className='h-full overflow-y-auto gap-5 flex flex-col minimal-sidebar pr-2'>
                <SidebarDropDown setFilters={setFilters} filter={filter} heading="By Ownership" group="ownership" options={[
                    { "text": "All Contacts", "icon": UserIcon, "value":"" }, 
                    // { "text": "Contacts By You", "icon": GroupIcon }
                ]} />
                <SidebarDropDown setFilters={setFilters} filter={filter} heading="By Mail Provider" group="mail" options={[
                    { "text": "All Providers", "icon": AllMailIcon,"value":"" }, 
                    { "text": "Gmail", "icon": GMailIcon, value:"gmail" }, 
                    { "text": "Yahoo", "icon": YahooIcon, value:"yahoo" }
                ]} />
                <SidebarDropDown setFilters={setFilters} filter={filter} heading="By Priority" group="priority" options={[
                    { "text": "Everyone", "icon": BookIcon,"value":"" }, 
                    { "text": "Contact with Message", "icon": MessageIcon,"value":"msg" }, 
                    { "text": "Starred Contacts", "icon": StarIcon,"value":"star" }
                ]} />
            </section>

            {/* bottom menu options */}
            <div className="absolute bottom-0 border-t-1 border-[var(--border)] left-0 w-full bg-[var(--sidebar)] rounded-b-2xl px-5 py-5 flex gap-5 justify-between overflow-x-auto hide-scrollbar">
                <label htmlFor='import-contact' className="w-full sm:w-max px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 cursor-pointer flex items-center gap-2 active:scale-85 transition-all duration-150 ">
<input
            type="file"
            accept=".json"
            id='import-contact'
            className="hidden"
            onChange={handleFileUpload}
            hidden
            />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>

                    <span className="">

                        Import
                    </span>
                </label>
                <button onClick={ExportContacts} className="w-full sm:w-max px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer flex items-center gap-2 active:scale-85 transition-all duration-150 ">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="">

                        Export
                    </span>
                </button>
            </div>

            
        </section>
        {parsedData.length>0 && <ImportContactsModal
  existingContacts={contacts}
  parsedData={parsedData}
  setParsedData={setParsedData}
  onImport={(data) => {
      // send to backend
      console.log(data);
    }}
    onClose={() => setParsedData([])}
/>}
    </>
    )
}

export default Sidebar
