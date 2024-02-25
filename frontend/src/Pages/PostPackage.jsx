import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import UploadField from '../Components/UploadField';
import Dropdown from '../Components/Dropdown';
import ButtonCTA from '../Components/ButtonCTA';
import newRequest from '../Utils/newRequest';

export default function PostPackage() {
  const categoryOptions = ['logo design - تصميم شعار', 'brand design - تصميم هوية', 'فن الرسوم التوضيحية - illustrations', 'المطبوعات - Printing', 'واحهة وتجربة المستخدم - UI/Ux', 'التعبئة والتغليف - packaging', 'التحؤيك - motion', 'مواقع التواصل - social media'];
  const tagOptions = ['Abstract', 'Tag 2', 'Tag 3'];

  const { username } = useParams();
  console.log('route hit');

  const [images, setImages] = useState('');
  const [input, setInput] = useState({
    name: '',
    desc: '',
    tags: '',
    price: '',
    category: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', input.desc);
      formData.append('name', input.name);
      formData.append('price', input.price);
      formData.append('category', input.category);
      formData.append('tags', input.tags);
      formData.append('file', images); // Append the file

      // Make the HTTP request using newRequest
      const response = await newRequest.post(`/getVisual/users/${username}/post-package`, formData);

      // Handle the response
      console.log('Data:', formData);
      // Add any further logic here for handling success
      setError(''); // Clear error if submission is successful
    } catch (error) {
      console.error('Error:', error);
      // Set error message
      setError('Failed to post package. Please try again.');
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
          <UploadField
            label="price"
            type="range"
            id="price"
            name='price'
            onChange={handleChange}
          />

          {/* Dropdown input for category */}
          <Dropdown
            label="category"
            options={categoryOptions}
            defaultValue={input.category}
            onChange={(value) => setInput(prevInput => ({ ...prevInput, category: value }))}
            name='category'
          />
          {/* Dropdown input for category */}
          <Dropdown
            label="tags"
            options={tagOptions}
            defaultValue={input.tags}
            onChange={(value) => setInput(prevInput => ({ ...prevInput, tags: value }))}
            name='tags'
          />


          <div className='file upload-field-input'>
            <input
              type="file"
              id='file'
              onChange={handleFileChange}
              accept='image/*,video/*'
            />
            <label htmlFor="file" className='label'>Image</label>
            <label htmlFor="file">+</label>
          </div>

          <ButtonCTA class="pri-cta cta" name="إرسال" />
        {error && <div className="error-message">{error}</div>}

        </form>
      </div>
    </div>
  );
}
