import React from "react";
import { SearchIcon, FilterIcon, ArrowUpDownIcon } from "../Helper/SvgIcons";

export default function Toolbar({fetchContacts, totalContacts, sortBy, setSortBy }) {
  return (
    <div className="flex justify-between items-center gap-4 mb-6 pr-5">
      {/* Search Input */}
      <p className="md:text-base text-sm">Showing {fetchContacts.length} Out of {totalContacts.length} contacts</p>
      {/* Sort */}
      <div className="relative">
        <ArrowUpDownIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl
          border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-800
          text-zinc-700 dark:text-zinc-200
          hover:border-indigo-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-all duration-200"
        >
        <option value="">Recent</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="createdAt">Created At</option>
        </select>
      </div>
    </div>
  );
}