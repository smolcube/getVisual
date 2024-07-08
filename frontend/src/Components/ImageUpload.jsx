import React, { useState, useEffect } from 'react';

export default function ImageUpload() {
    const [imageFilenames, setImageFilenames] = useState([]);

    useEffect(() => {
      // Fetch image filenames from the backend
      fetch('/api/images')
        .then(response => response.json())
        .then(data => setImageFilenames(data.imageFilenames))
        .catch(error => console.error('Error fetching image filenames:', error));
    }, []);
  
    return (
      <div>
        {imageFilenames.map(filename => (
          <img key={filename} src={`/uploads/${filename}`} alt="Uploaded" />
        ))}
      </div>
    );
  }
  
