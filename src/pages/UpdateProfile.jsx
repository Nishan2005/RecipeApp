import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';



function UpdateProfile({ isOpen, onClose, userId  }) {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setPhotoUploaded(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append("Id", userId);

    formData.append("fullName", document.getElementById("category-title").value);
    
    if (photoFile) {
      formData.append("Photo", photoFile);
    }
    
    try {
      const response = await axios.post('https://localhost:7043/api/Users/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        alert("Category submitted successfully!");
        onClose();
      } else {
        alert("Failed to submit category.");
      }
    } catch (err) {
      console.error("Error submitting category:", err);
      alert("Error submitting category. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Your Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category-title" className="block font-medium mb-1">
              UserName
            </label>
            <input
              type="text"
              id="category-title"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              id="photo-input"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              onClick={() => document.getElementById('photo-input').click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
            >
              <div className="text-2xl mb-2">📷</div>
              {photoUploaded ? (
                <div className="text-green-600">
                  <p>Photo uploaded successfully!</p>
                </div>
              ) : (
                <div className="text-gray-500">
                  <p>Click to upload a photo</p>
                  <p className="text-sm">(or drag and drop)</p>
                </div>
              )}
            </button>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#DAE952] text-white rounded-md hover:bg-[#DAE952]"
            >
              UpdateProfile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile
