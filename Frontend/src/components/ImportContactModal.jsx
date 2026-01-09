import { useState } from "react";
import { CheckCircleIcon, RefreshIcon, TrashIcon,CloseIcon, AllMailIcon, PhoneIcon, MessageIcon } from "../Helper/SvgIcons";
import { toast } from "react-toastify";

export default function ImportContactsModal({
  onImport,
  onClose,
  parsedData,
  setParsedData,
}) {


  function handleImportAll() {
    onImport(parsedData);
    onClose();
    toast.success("Imported Successfully");
  }

    function removeUser(index) {
    setParsedData(prev => prev.filter((_, i) => i !== index));
  }


  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition duration-100 hover:scale-105 active:scale-95"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[calc(100%-20px)] max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Import Contacts</h2>
          <button onClick={onClose}>
            <CloseIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
          </button>
        </div>


        {/* Preview */}
        {parsedData.length > 0 && (
          <div className="max-h-72 overflow-auto space-y-3 minimal-sidebar pr-2">
            {parsedData.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-[var(--border)] rounded-xl p-4 hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="flex items-center gap-2 text-sm opacity-70"><AllMailIcon className="size-3" />{user.email}</p>
                  <p className="flex items-center gap-2 text-sm opacity-70"><PhoneIcon className="size-3" />{user.phone}</p>
                  <p className="flex items-center gap-2 text-xs opacity-50 "><MessageIcon className="size-3" />{user.message=="" ? "N/A":user.message}</p>
                </div>

                <div className="flex items-center gap-3">
                  {user.exists ? (
                    <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      <RefreshIcon className="w-3 h-3" />
                      Update
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 ">
                      <CheckCircleIcon className="w-3 h-3" />
                      Add New
                    </span>
                  )}

                  <button
                    onClick={() => removeUser(index)}
                    className="text-red-500 hover:text-red-600 cursor-pointer transition duration-100 hover:scale-105 active:scale-95"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:opacity-80 cursor-pointer transition duration-100 hover:scale-105 active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={handleImportAll}
            disabled={parsedData.length === 0}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 cursor-pointer transition duration-100 hover:scale-105 active:scale-95"
          >
            Import All
          </button>
        </div>
      </div>
    </div>
  );
}
