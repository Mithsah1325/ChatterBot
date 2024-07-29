import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false); // Added for loading state
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { prompt }); // Adjusted port to 5000
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    return (
        <div className='chatbot flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-white border border-gray-200'>
            <h1 className="title text-3xl font-bold text-gray-800 mb-6">ChatGPT</h1>
            <form className='form w-full max-w-md bg-white shadow-lg rounded-lg p-6' onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor='prompt' className='block text-gray-700 font-semibold mb-2'>Ask a Question:</label>
                    <input
                        id='prompt'
                        type='text'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your question...'
                        value={prompt}
                        onChange={handlePromptChange}
                    />
                </div>

                <div className='btn-container flex justify-center'>
                    <button 
                        type='submit' 
                        className='btn bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out' 
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
            <div className='response-container mt-6 w-full max-w-md'>
                {error && <p className='text-red-600 text-center mb-4'>{error}</p>}
                <div className='p-4 bg-white border-gray-200 rounded-lg shadow-lg'>
                    <p className='text-gray-600 text-xl text-center shadow-xl p-4'>
                        {response || "Ask me anything..."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
