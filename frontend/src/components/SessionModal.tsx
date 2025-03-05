'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChatBubbleLeftRightIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionModal({ isOpen, onClose }: SessionModalProps) {
  const router = useRouter();

  const handleChatSession = () => {
    router.push('/chat');
    onClose();
  };

  const handleVoiceSession = () => {
    router.push('/voice');
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={handleChatSession}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Chat</span>
                  </button>

                  <button
                    onClick={handleVoiceSession}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MicrophoneIcon className="h-8 w-8 text-indigo-600" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Voice</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <XMarkIcon className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm font-medium text-gray-900">Cancel</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 