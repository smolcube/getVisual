import React, { useState } from 'react';

// components
import UploadField from '../Components/UploadField'; 
import ButtonCTA from '../Components/ButtonCTA';

export default function PostService() {

//const [files, setFiles] = useState(null)
const [input, setInput] = useState({
  description: '',
  serviceName: '',
  price: '',
  category: '',
  tags: '',
  errors: null
})

// to handle the input content  
const handleChange = (e)=> {
  const {name, value} = e.target;
  setInput(prevInput => {
    return {
    ...prevInput,
    [name] : value
  }
})
}

const handleSubmit= async (e) =>{
  e.preventDefault();
  console.log(input);
}
  return (
    <div className='postService'>
      <div className='postService__header'>
        <div className='postService__header--text'>
        <h2>
          نشر خدمـة
        </h2>
        <p>
        سيتم إرسال تفاصيل الخدمة إلى لوحة التحكم
         لمراجعتها من قبل المشرفين على 
         <span className="highlighted"> getVisual </span>
         إذا كانت الخدمة تستوفي المعايير،
           فسيتم الموافقة عليها او سيتم ارسال
             رسالة على بريدك الالكتروني بالتفاصيل.
           
        </p>
        </div>
      </div>
      <div className="postService__upload">
      <h3>
      يرجى ملء هذه الحقول بعناية
      </h3>
          <form 
            className='postService__upload--form'
            action="" 
            method="post"
            onSubmit={handleSubmit}>

          <div className='file upload-field-input'>
          <input type="file" id='file' />
          <label for="file" className='label'>image</label>
          <label for="file">+</label>
          </div>
          {/* IMAGES 
          <UploadField
          input_additionalClassName='input_fileUpload'
          label_additionalClassName='label_fileUpload'
          label="images"
          type="file"
          id="images"
          name='images'
          multiple // Using 'multiple' without specifying a value is equivalent to 'multiple={true}'
          // value="" // You don't usually set a value for file input
          // onChange={} // Pass your onChange function here
          />*/}


          {/* DESCRIPTION */}
          <UploadField
          label="description"
          type="text"
          id="description"
          placeholder="add a description"
          //value=""
          name='description'
          onChange={handleChange}
          />

          {/* PRICE */}
          <UploadField
          label="price"
          type="range"
          id="price"
          //placeholder="+"
          //value=""
          name='price'
          onChange={handleChange}
          />

          {/* CATEGORY */}
          <UploadField
          label="category"
          type="text"
          id="category"
          placeholder="choose"
          //value=""
          name='category'
          onChange={handleChange}
          />

          {/* TAGS */}
          <UploadField
          label="tags"
          type="text"
          id="tags"
          placeholder="choose"
          //value=""
          name='tags'
          onChange={handleChange}
          />

          <ButtonCTA
            class="pri-cta cta"
            name="إرسال"
          />
          </form>
      </div>
    </div>
);
}
