import React, { useState } from 'react';
import faqsData from '../data/FAQs';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (

    <section id='FAQs' className='faqs'>
      <h1>الاسئـلة الشائعة</h1>
      <span className='span-small'>(Frequntly Asked Questions)</span>
      <div className="faqs__questions">
        {faqsData.map((faq, index) => (
          <div key={index} className="faqs__questions--item">
            <div className="question-container">
              <button
                className="showAns"
                onClick={() => toggleAnswer(index)} 
              >
                {openIndex === index ? 
                    <ion-icon name="chevron-up-circle-outline"></ion-icon> 
                    : 
                    <ion-icon name="chevron-down-circle-outline"></ion-icon>}
              </button>
              <div className="question">
                {faq.ques}
              </div>
            </div>
            {openIndex === index && (
              <div className="answer">
              {faq.answer}
              {openIndex === index && faq.list && (
                <ol>
                  {faq.list.map((item, i) => (
                    <li key={i}>{item} <br /> </li>
                  ))}
                </ol>
              )}
              </div>
            )}
          </div>
        ))}
        <br />
        <p>لأي اسئلة اخرى تواصلوا معنا بإستخدام معلومات التواصل المتوفرة ادناه.</p>
      </div>
    </section>
  );
}
