import React from "react";
import { SearchIcon, FilterIcon, ArrowUpDownIcon } from "../Helper/SvgIcons";

export default function Toolbar({ search, setSearch }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[220px]">
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

      {/* Filter */}
      <div className="relative">
        <FilterIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />

        <select
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl
          border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-800
          text-zinc-700 dark:text-zinc-200
          hover:border-indigo-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-all duration-200"
        >
          <option>Filter</option>
          <option>A–Z</option>
          <option>Z–A</option>
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <ArrowUpDownIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />

        <select
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl
          border border-zinc-300 dark:border-zinc-700
          bg-white dark:bg-zinc-800
          text-zinc-700 dark:text-zinc-200
          hover:border-indigo-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-all duration-200"
        >
          <option>Sort by Name</option>
          <option>Email</option>
        </select>
      </div>
    </div>
  );
}