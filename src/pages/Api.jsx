import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Api() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
        prepTime: '',
        Category: '',
        Servings: '',
        Instruction: '',
        Ingredients: ''

      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: files ? files[0] : value
        }));
      };
    useEffect(() =>{
      axios.get(`https://localhost:7043/api/Users/UserProfile`, {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJOaXNoYW4iLCJlbWFpbCI6Im5pc2hhbkBnbWFpbC5jb20iLCJVc2VyVHlwZSI6IjIiLCJuYmYiOjE3NDQ5NjkxNjEsImV4cCI6MTc0NDk3NjM2MCwiaWF0IjoxNzQ0OTY5MTYxfQ.mGcerMLg0n3Q0vAv-vV5w26fMOOjTb1oUmskSpL4iJg`
  }})
    })
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Title', formData.title);
        data.append('Description', formData.description);
        data.append('PrepTime', formData.prepTime);
        data.append('Servings', formData.Servings);
        data.append('Ingredients', formData.Ingredients);
        data.append('Instructions', formData.Instruction);
        data.append('Categories', formData.Category);
        data.append('Photo', formData.image); // 👈 this is the file


        debugger;
        console.log(data);
        
        try {
          const res = await axios.post('https://localhost:7043/api/Test/products', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Success:', res.data);
        } catch (err) {
          console.error('Upload failed:', err);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          <input type="text" name="prepTime" placeholder="Prer" onChange={handleChange} required />
          <input type="text" name="Category" placeholder="Description" onChange={handleChange} required />
          <input type="text" name="Servings" placeholder="Description" onChange={handleChange} required />
          <input type="text" name="Instruction" placeholder="Description" onChange={handleChange} required />
          <input type="text" name="Ingredients" placeholder="Description" onChange={handleChange} required />



          <button type="submit">Submit</button>
        </form>
      );

}

export default Api;
