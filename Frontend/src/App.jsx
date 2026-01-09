import { useEffect, useState } from "react";
import Toolbar from "./components/Toolbar";
import ContactList from "./pages/ContactList";
import AddContactModal from "./components/AddContactModal";
import Header from "./pages/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./pages/Sidebar";

export default function App() {
  // displaying all contacts here
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  // for adding contact
  const [showModal, setShowModal] = useState(false);
  // selected ones here
  const [selected, setSelected] = useState([]);
  // for sorting here
  const [sortBy, setSortBy] = useState("");
  // show sidebar
  const [showSidebar,setShowSidebar] = useState(false)

  useEffect(() => {
    fetchContacts();

    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.classList.add("dark")
    }
  }, []);

  async function fetchContacts() {
    const res = await fetch("https://contact-manager-4862.up.railway.app/contacts", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    const data = await res.json();
    setContacts(data);
  }

   // sidebar filters
  const [filters, setFilters] = useState({
    "ownership": "",
    "mail": "",
    "priority": "",
  });

  // .filter((c) =>
  //   c.name.toLowerCase().includes(search.toLowerCase()) ||
  //   c.email.toLowerCase().includes(search.toLowerCase()) ||
  //   c.phone.includes(search)
  // )
  const sortedContact = contacts
    .filter((c) => {
    const searchText = search.toLowerCase();

    return (
      (
        c.name.toLowerCase().includes(searchText) &&
        (c.email.toLowerCase().includes(filters["mail"]) && c.email.toLowerCase().includes(searchText)) &&
        c.phone.includes(search) && 
        (filters["priority"]=="msg" ? c.message : filters["priority"]=="star" ? filters["star"]=="1" : true)
      ) 
    );
  })
    .sort((a, b) => {
      if (!sortBy) return 0; // No sort
      if (sortBy === "createdAt") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    });


  return (
    <main className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--text-primary)] transition duration-150 flex flex-col">
      <Header
        onAdd={() => setShowModal(true)}
        selected={selected} setSelected={setSelected}
        setContacts={setContacts}
        search={search}
        setSearch={setSearch}
        setShowSidebar={setShowSidebar}
      />

      <section className="grid md:grid-cols-[max-content_1fr] gap-5 h-full px-5 py-5 overflow-hidden">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} filter={filters} setFilters={setFilters} contacts={contacts} />
        <div className="flex flex-col overflow-y-auto bg-[var(--sidebar)] shadow-sm rounded-2xl pl-5 py-5" >
          <Toolbar fetchContacts={sortedContact} totalContacts={contacts} search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
          <ContactList setFilters={setFilters} filters={filters} fetchContacts={fetchContacts} contacts={sortedContact} setContacts={setContacts} selected={selected} setSelected={setSelected} />
        </div>
      </section>

      {showModal && (
        <AddContactModal
          contacts={contacts}
          onClose={() => setShowModal(false)}
          onAdd={fetchContacts}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}  // in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </main>
  );
}
