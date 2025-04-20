'use client';

import Link from 'next/link';
import { useState } from 'react';
import '../globals.css';

const options = ['Homelessness', 'Mental/Physical Disabilities', 'Animal Safety', 'Underfunded Education', 'Rehabilitation Programs'];

export default function MultiCheckboxPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [otherChecked, setOtherChecked] = useState(false);
    const [otherValue, setOtherValue] = useState('');
  
    const handleToggle = (option: string) => {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    };
  
    const handleOtherToggle = () => {
      setOtherChecked(!otherChecked);
  
      if (!otherChecked && otherValue) {
        setSelected((prev) => [...prev, otherValue]);
      } else {
        setSelected((prev) => prev.filter((item) => item !== otherValue));
      }
    };
  
    const handleOtherInput = (value: string) => {
      // Remove old otherValue, update with new
      setSelected((prev) => [
        ...prev.filter((item) => item !== otherValue),
        value,
      ]);
      setOtherValue(value);
    };

    const handleGoToChatbot = () => {
        localStorage.setItem('selectedCauses', JSON.stringify(selected));
      };    
  
    return (
      <div className="root min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4" style={{ backgroundColor: '#f8bdc1', minHeight: '100vh' }}>
        <div className="self-start text-left w-full flex ml-4 fixed top-10">
        <Link href="/"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
        ← Back to Home
        </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6 ">Which charities causes are you most passionate about?</h1>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-3 mb-4 font-[family-name:var(--font-geist-mono)]">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
  
          {/* Other Option */}
          <label className="flex items-start space-x-3 mb-2">
            <input
              type="checkbox"
              checked={otherChecked}
              onChange={handleOtherToggle}
              className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex flex-col w-full">
              <span className="text-gray-700 mb-1 font-[family-name:var(--font-geist-mono)]">Other</span>
              {otherChecked && (
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => handleOtherInput(e.target.value)}
                  placeholder="Please specify"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </label>
  
          <div className="mt-6">
            <h2 className="text-sm text-gray-500 font-[family-name:var(--font-geist-mono)]">Selected:</h2>
            <p className="text-md font-medium text-gray-800 font-[family-name:var(--font-geist-mono)]">
              {selected.length > 0 ? selected.join(', ') : 'None selected'}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row justify-center mx-auto w-fit">
        <Link
            href="/chatbot"
            onClick={handleGoToChatbot}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            rel="noopener noreferrer">
            Go to Chatbot
        </Link>
        </div>
      </div>
    );
  }