import { useState } from "react";
import { UserIcon, MailIcon, PhoneIcon } from "../Helper/SvgIcons";
import {InputField,TextareaField} from "../Helper/InputFields";
import {  toast } from "react-toastify";
import axios from "axios";

export default function EditContactModal({ contact, onClose, onUpdate }) {
  const [form, setForm] = useState({
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    message: contact.message || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    let error = "";

    if (field === "name" && !value.trim()) {
      error = "Name is required";
    }

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
    }

    if (field === "phone") {
      if (!value.trim()) error = "Phone is required";
      else if (!/^\d{10}$/.test(value)) error = "Enter 10-digit phone number";
    }

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

    try {
      setLoading(true);
      // await fetch(`https://contact-manager-4862.up.railway.app/update/${contact._id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json","ngrok-skip-browser-warning": "true", },
      //   body: JSON.stringify(form),
      // });
      await fetch(`https://contact-manager-4862.up.railway.app/update/${contact._id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // optional for ngrok
  },
  body: JSON.stringify(form),
});
      onUpdate();
      onClose();
      toast.success("Updated Successfully");
    } catch (err) {
        console.error(err);
        toast.error(`Error Occurred ${err}`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl
        bg-white dark:bg-zinc-900
        p-6 shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          Edit Contact
        </h2>

        <InputField
          label="Name"
          icon={UserIcon}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          onBlur={() => validateField("name", form.name)}
          error={errors.name}
        />

        <InputField
          label="Email"
          type="email"
          icon={MailIcon}
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          onBlur={() => validateField("email", form.email)}
          error={errors.email}
        />

        <InputField
          label="Phone"
          icon={PhoneIcon}
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          onBlur={() => validateField("phone", form.phone)}
          error={errors.phone}
        />

        <TextareaField
          label="Message (Optional)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg
            bg-zinc-200 dark:bg-zinc-700
            hover:bg-zinc-300 dark:hover:bg-zinc-600
            transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="px-5 py-2 rounded-lg
            bg-indigo-600 text-white
            hover:bg-indigo-700
            disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
