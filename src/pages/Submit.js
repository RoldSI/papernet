import React, { useState} from "react";

function Submit() {
    // State to store the selected file
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [citations, setCitations] = useState([]);

    // Handle file input change
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Update the state with the new file
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorsChange = (event) => {
        // Split by commas and convert to integers
        const nums = event.target.value.split(',').map(num => parseInt(num.trim(), 10));
        setAuthors(nums);
    };

    const handleCitationsChange = (event) => {
        const nums = event.target.value.split(',').map(num => parseInt(num.trim(), 10));
        setCitations(nums);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        alert(`Title: ${title}, Authors: ${authors.join(', ')}, Citations: ${citations.join(', ')}, File: ${file.name} is ready to be uploaded.`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Authors (comma separated):
                    <input
                        type="text"
                        value={authors}
                        onChange={handleAuthorsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Citations (comma separated):
                    <input
                        type="text"
                        value={citations}
                        onChange={handleCitationsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload file:
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Upload File
            </button>
        </form>
    );
}

export default Submit
