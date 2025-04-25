import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get('https://localhost:7043/api/Recipe/all')
      .then(res => {
        setImages(res.data);
        console.log(res.data);
        
      })
      .catch(err => console.error('Failed to fetch images', err));
  }, []);

  return (
    <div className='pt-20'>
      <h1>{id}</h1>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map(img => (
          <div key={img.id} style={{ margin: '10px' }}>
            <h1>{img.title}</h1>
            <img
              src={`https://localhost:7043${img.imagePath}`} // ✅ lowercase
              alt={img.title}
              style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
