import React from 'react';
import { X } from 'lucide-react';
import ConfirmationModalProps from '@/Interfaces/ConfirmationModal';
import ButtonComponent from './Button';


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <ButtonComponent
            type="button"
            onClick={onClose}
            className="absolute end-2.5 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close modal</span>
          </ButtonComponent>

      
          <div className="p-4 text-center md:p-5">
           
            <div className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200">
              <svg
                aria-hidden="true"
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

           
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {itemName}?
            </h3>

           
            <div className="flex justify-center gap-3">
              <ButtonComponent
                type="button"
                onClick={onConfirm}
                className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              >
                Yes, I&apos;m sure
              </ButtonComponent>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;