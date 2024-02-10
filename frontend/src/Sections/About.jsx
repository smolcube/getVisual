import React from 'react';


export default function About() {
  return (
    <section id='About' className='about'>
    <div className="about__container">
      
    <div className='about-card card-item'>
      <div className="about__container--tile1">
        <h2 className='categ'>
        تصنيفات احترافية <br />لعرض الخدمات
        </h2>
        <h3>
        مجموعة شاملة
        </h3>
        <p className='about-content'>
        خدمة مجموعة واسعة من احتياجات العملاء،
         والسماح للمصممين بالعثور على المكان المثالي لعملهم الرائع،
          لأننا نفهم قوة الاتصال المرئي.
        </p>
      </div>
      <img className="tile1-image" src={process.env.PUBLIC_URL +  '/assets/about01.jpg'} alt="" />
        {/*<img className="tile1-image" src={servicesW} alt="" />*/}
    </div>

    <div className='about-card card-item'>
      <img  className="tile2-image" src={process.env.PUBLIC_URL +  '/assets/about02.svg'} alt="" />
      <div className="about__container--tile2">
      <h2>
      طـور علامتك التجارية 
      </h2>
      <h3>
      مع تصميم استثنائي
      </h3>
      <p className='about-content'>
      تمكين الشركات والأفراد من رفع مستوى علاماتهم التجارية
       وتقديم قصص ملفتة من خلال تصميم استثنائي.
      </p>
      </div>
    </div>  

    <div className='about-card card-item'>
      <div className="about__container--tile1">
        <h2>
        لا تنازل عن الجودة
        </h2>
        <h3>
        التميز في كل تفصيل.
        </h3>
        <p className='about-content'>
        لدينا عملية فحص صارمة لمصممينا لضمان حصولك على أعمال تصميم استثنائية.
         الجودة هي وعدنا، وهي تنعكس في كل مشروع نقوم بعرضه
        </p>
      </div>
        <img className="tile3-image" src={process.env.PUBLIC_URL +  '/assets/about03.png'} alt="" />
    </div>

    <div className='about-card card-item'>
      <img  className="tile2-image" src={process.env.PUBLIC_URL +  '/assets/about04.jpg'} alt="" />
      <div className="about__container--tile2">
      <h2>
      تجربة سهلة وسلسة 
      </h2>
      <h3>
      حيث تلتقي السهولة بالفاعلية
      </h3>
      <p className='about-content'>
      نقدم تجربة فريدة تجمع بين السهولة والتفاعلية لضمان تحقيق أهدافك بكل فعالية وكفاءة.
       انضم إلينا واستمتع برحلة ملهمة في عالم الإبداع والابتكار
      </p>
      </div>
    </div>

    </div>
    </section>
  )
}
