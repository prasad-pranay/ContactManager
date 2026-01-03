import { useEffect, useState } from "react";
import Toolbar from "./components/Toolbar";
import ContactList from "./components/ContactList";
import AddContactModal from "./components/AddContactModal";
import Header from "./components/Header";

export default function App() {
  // displaying all contacts here
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  // for adding contact
  const [showModal, setShowModal] = useState(false);
  // selected ones here
  const [selected,setSelected] = useState([]);


  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const res = await fetch("http://localhost:5000/contacts");
    const data = await res.json();
    setContacts(data);
  }

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <main className="h-screen overflow-hidden bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6 transition duration-150 flex flex-col">
        <Header
          onAdd={() => setShowModal(true)}
          selected={selected} setSelected={setSelected}
          setContacts={setContacts}
        />

        <Toolbar search={search} setSearch={setSearch} />

        <ContactList fetchContacts={fetchContacts} contacts={filtered} setContacts={setContacts} selected={selected} setSelected={setSelected} />

        {showModal && (
          <AddContactModal
            contacts={contacts}
            onClose={() => setShowModal(false)}
            onAdd={fetchContacts}
          />
        )}
      </main>
  );
}
