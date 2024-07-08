import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

/// modules
import newRequest from '../Utils/newRequest';

// Components
import UploadField from '../Components/UploadField';
import Dropdown from '../Components/Dropdown';
import ButtonCTA from '../Components/ButtonCTA';

export default function PostPackage() {

  const categoryOptions = ['تصميم شعار - logo design', 'تصميم هوية - brand design', 'فن الرسوم التوضيحية - illustrations', 'المطبوعات - Printing', 'واحهة وتجربة المستخدم - UI/Ux', 'التعبئة والتغليف - packaging', 'التحريك - motion', 'مواقع التواصل - social media'];

  const tagOptionsMap = {
    'تصميم شعار - logo design': ['Abstract', 'Typography', 'Icon'],
    'تصميم هوية - brand design': ['Branding', 'Identity', 'Logo'],
    'فن الرسوم التوضيحية - illustrations': ['Illustration', 'Drawing', 'Digital Art'],
    'المطبوعات - Printing': ['Printing', 'Brochure', 'Flyer'],
    'واحهة وتجربة المستخدم - UI/Ux': ['UI', 'UX', 'Design'],
    'التعبئة والتغليف - packaging': ['Packaging', 'Label', 'Box'],
    'التحريك - motion': ['Motion Graphics', 'Animation', 'Video'],
    'مواقع التواصل - social media': ['Social Media', 'Instagram', 'Facebook', 'youtube']
  };

  const { username } = useParams();
  console.log('route hit');

  const [input, setInput] = useState({
    name: '',
    desc: '',
    tags: '',
    state: false,
    price: 10,
    category: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setInput(prevInput => ({
      ...prevInput,
      file: e.target.files[0] // Store the selected file in state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('desc', input.desc);
      formData.append('name', input.name);
      formData.append('price', input.price);
      formData.append('category', input.category);
      formData.append('tags', input.tags);
      formData.append('state', input.state); 
      formData.append('file', input.file); // Append the selected file to the form data
  
    console.log(formData);

  // Make the HTTP request using newRequest
  const response = await newRequest.post(`/upload/users/${username}/post-package`, formData, {
    headers: {
    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
    }
  });
  
      // Check if the upload was successful
      if (response.status === 201) {
        console.log(response.status);
        setMessage('Upload successful!');
        // Optionally, you can reset the input fields after successful upload
        setInput({
          name: '',
          desc: '',
          tags: '',
          state: false,
          price: 10,
          category: ''
        });
      }  else {
        // Handle unexpected response status
        console.log('Unexpected response status:', response.status);
        setMessage('Unexpected response status:', response.status);
      }
    } catch (error) {
      throw new Error (error)
      setMessage('Failed to post package. Please try again!!!.');
      // Add any further logic here for handling errors
    }
  };

  return (
    <div className='postService'>
      <div className='postService__header'>
        <div className='postService__header--text'>
          <h2>نشر خدمـة</h2>
          <p>
            سيتم إرسال تفاصيل الخدمة إلى لوحة التحكم لمراجعتها من قبل المشرفين على
            <span className="highlighted"> getVisual </span>
            إذا كانت الخدمة تستوفي المعايير، فسيتم الموافقة عليها أو سيتم إرسال رسالة على بريدك الالكتروني بالتفاصيل.
          </p>
        </div>
      </div>
      <div className="postService__upload">
        <h3>يرجى ملء هذه الحقول بعناية</h3>

        <form
          className='postService__upload--form'
          onSubmit={handleSubmit}
        >
          <UploadField
            label="description"
            type="text"
            id="description"
            placeholder="Add a description"
            name='desc'
            onChange={handleChange}
          />
          <UploadField
            label="name"
            type="text"
            id="name"
            placeholder="Enter package name"
            name='name'
            onChange={handleChange}
          />

          <div className="slidecontainer">
            <span className='span-mid'> price {input.price}</span>
            <input
              type="range"
              min={10}
              max={100}
              value={input.price}
              className="slider"
              id="price"
              name="price"
              onChange={e => setInput(prevInput => ({ ...prevInput, price: parseInt(e.target.value) }))} // Update price state when slider changes
            />
          </div>

          {/* Dropdown input for category */}
          <Dropdown
            label="category"
            options={categoryOptions}
            defaultValue={input.category}
            onChange={(value) => setInput(prevInput => ({ ...prevInput, category: value }))}
            name='category'
          />
          {/* Dropdown input for tags based on selected category */}
          <Dropdown
            label="tags"
            options={tagOptionsMap[input.category] || []}
            defaultValue={input.tags}
            onChange={(value) => setInput(prevInput => ({ ...prevInput, tags: value }))}
            name='tags'
          />
          <div className='file upload-field-input'>
            <input
              type="file"
              id='file'
              name='file'
              onChange={handleFileChange}
              accept='image/*,video/*'
              multiple
            />
            <label htmlFor="file" className='label'>Image</label>
            <label htmlFor="file">+</label>
          </div>
          <ButtonCTA className="pri-cta cta" name="إرسال" />
          {message && <div className="messages">{message}</div>}
        </form>
      </div>
    </div>
  );
}
