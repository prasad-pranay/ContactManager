import React from "react";
import { UserIcon, MailIcon, PhoneIcon, MessageIcon, TrashIcon } from "../Helper/SvgIcons";

export default function ContactCard({
  name,
  email,
  phone,
  message,
  onDelete,
}) {
  return (
    <section
      className="group relative overflow-hidden rounded-2xl w-100
      bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800
      p-5 shadow-sm
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300"
      >
      {/* Gradient Accent */}
      <div
        className="absolute inset-x-0 top-0 h-1
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl
          bg-indigo-100 dark:bg-indigo-500/10"
          >
          <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {name}
          </h3>
          <p className="text-sm text-zinc-500">Contact</p>
        </div>

        {onDelete && (
            <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition
            text-zinc-400 hover:text-red-500"
            title="Delete contact"
            >
            <TrashIcon size={18} />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        {/* Email */}
        <div
          className="flex items-center gap-3 cursor-pointer group/item"
          onClick={() => navigator.clipboard.writeText(email)}
          title="Click to copy email"
          >
          <MailIcon className="w-4 h-4 text-zinc-400 group-hover/item:text-indigo-500 transition" />
          <span className="text-zinc-700 dark:text-zinc-300 group-hover/item:underline">
            {email}
          </span>
        </div>

        {/* Phone */}
        <div
          className="flex items-center gap-3 cursor-pointer group/item"
          onClick={() => navigator.clipboard.writeText(phone)}
          title="Click to copy phone"
        >
          <PhoneIcon className="w-4 h-4 text-zinc-400 group-hover/item:text-indigo-500 transition" />
          <span className="text-zinc-700 dark:text-zinc-300 group-hover/item:underline">
            {phone}
          </span>
        </div>

        {/* Message */}
        <div className="flex items-start gap-3">
          <MessageIcon className="w-4 h-4 mt-0.5 text-zinc-400" />
          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {message || "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}
