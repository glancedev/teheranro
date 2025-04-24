import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('googlesheets');

  // Let's replace the toggle with actual Google Sheets fetching logic
  const fetchFromGoogleSheets = async (sheetId, apiKey) => {
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A2:B?key=${apiKey}`);
      const data = await response.json();
      
      if (data.values) {
        const items = data.values.map((row, index) => ({
          id: index.toString(),
          title: row[0],
          url: row[1]
        }));
        setNewsItems(items);
      } else {
        setNewsItems([]);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.toString());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // In a real implementation, you would use your actual Google Sheets ID and API key
    // For demo purposes, we'll still use mockup data
    
    const mockNews = [
      {
        id: '1',
        title: 'Introducing the new React documentation',
        url: 'https://react.dev'
      },
      {
        id: '2',
        title: 'The Ultimate Guide to Web Performance in 2025',
        url: 'https://example.com/web-performance'
      },
      {
        id: '3',
        title: 'Announcing TensorFlow 3.0',
        url: 'https://example.com/tensorflow-3'
      },
      {
        id: '4',
        title: 'Revolutionizing Code Reviews with AI',
        url: 'https://example.com/ai-code-reviews'
      },
      {
        id: '5',
        title: 'The Future of Remote Work',
        url: 'https://example.com/remote-work-2025'
      }
    ];

    // In a real implementation, you would call:
    // fetchFromGoogleSheets('YOUR_SHEET_ID', 'YOUR_API_KEY');
    
    // For now, simulate API call with mock data
    setTimeout(() => {
      setNewsItems(mockNews);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">Loading links...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-700">Error loading links: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">My Links</h1>
          <div className="text-sm text-gray-500 mt-1">
            Powered by Google Sheets
          </div>
        </div>
        
        <ul className="space-y-3">
          {newsItems.map((item) => (
            <li key={item.id} className="bg-white p-3 rounded shadow-sm">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-900 hover:underline"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 bg-white rounded shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Google Sheets Setup Instructions</h2>
          <div className="text-sm text-gray-700">
            <h3 className="font-medium">1. Create your spreadsheet</h3>
            <p>Set up a Google Sheet with these columns in row 1:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Column A: "title" - The title of the link</li>
              <li>Column B: "url" - The destination URL</li>
            </ul>
            
            <h3 className="font-medium">2. Enable API access</h3>
            <ol className="list-decimal pl-5">
              <li>Go to Google Cloud Console and create a project</li>
              <li>Enable the Google Sheets API</li>
              <li>Create an API key with appropriate restrictions</li>
              <li>Make your spreadsheet public or set specific access permissions</li>
              <li>Update the code with your Sheet ID and API key</li>
            </ol>
            
            <div className="mt-4 p-2 bg-gray-100 rounded">
              <code className="text-sm">
                // Replace in the code<br/>
                fetchFromGoogleSheets('YOUR_SHEET_ID', 'YOUR_API_KEY');
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;