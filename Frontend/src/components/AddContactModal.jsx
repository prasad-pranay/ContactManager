import { useState } from "react";
import { UserIcon, MailIcon, PhoneIcon } from "../Helper/SvgIcons";
import { TextareaField, InputField } from "../Helper/InputFields";
import { toast } from "react-toastify";

export default function AddContactModal({ onClose, onAdd, contacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const existedNames = contacts.map(value=>value.name)

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";

    if (field === "name" && !value.trim()) {
      error = "Name is required";
    }else if(field=="name" && existedNames.includes(value.trim())){
        error = "Name already Existed"
    }

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email address";
    }

    if (field === "phone") {
      if(value.trim().length>10){
        error="Phone number cannot be greater than 10 digits"
      }
      else if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value)) error = "Enter 10-digit phone number";
    }

    console.log(error)

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    Object.values(errors).every((e) => !e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    await fetch("https://contact-manager-4862.up.railway.app/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json","ngrok-skip-browser-warning": "true", },
      body: JSON.stringify(form),
    });

    onAdd();
    onClose();
    toast.success(`${form.name} is added to your Contacts`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900
        p-6 shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          Add Contact
        </h2>

        <InputField
          label="Name"
          icon={UserIcon}
          value={form.name}
          onChange={(e) =>{
            setForm({ ...form, name: e.target.value })
            validateField("name", form.name)
          }
          }
          onBlur={() => validateField("name", form.name)}
          error={errors.name}
          placeholder="John Doe"
        />

        <InputField
          label="Email"
          type="email"
          icon={MailIcon}
          value={form.email}
          onChange={(e) =>{
            setForm({ ...form, email: e.target.value })
            validateField("email", form.email)
          }
          }
          onBlur={() => validateField("email", form.email)}
          error={errors.email}
          placeholder="john@example.com"
        />

        <InputField
          label="Phone"
          icon={PhoneIcon}
          value={form.phone}
          onChange={(e) =>{
            setForm({ ...form, phone: e.target.value })
            validateField("phone", e.target.value)}}
          onBlur={() => validateField("phone", form.phone)}
          error={errors.phone}
          placeholder="9876543210"
        />

        <TextareaField
          label="Message (Optional)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          placeholder="Any additional notes..."
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700
            hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer transition duration-100 hover:scale-105 active:scale-95 "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white
            hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer duration-100 hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
