
// ICONS
import logoDesign from '../data/categories/logo.png';
import brandingDesign from '../data/categories/branding.png';
import illustration from '../data/categories/illustration.png';
import printDesign from '../data/categories/print.png';
import uiux from '../data/categories/ab-testing.png';
import packaging from '../data/categories/packging.png';
import motion from "../data/categories/motion.png";
import socialMedia from "../data/categories/socialMedia.png";

// IMAGES 
import logoDesignImg from './categories/logo-design.jpeg';
import brandingDesignImg from './categories/branding-design.jpg';
import illustrationsImg from './categories/illustrations.jpg';
import printDesignImg from './categories/printImg.jpg' ;
import uiDesignImg from './categories/uiDesignImg.jpeg'
import packagingDesignImg from './categories/packaging.jpeg';
import motionImg from './categories/motionImg.jpeg';

// phone Images
import logoDesignPhone from './categories/logo-design-phone.png'
import brandingDesignImgPhone from './categories/branding-design-phone.jpg'
import illustrationsPhone from './categories/illustrations-phone.jpg'
import printDesignImgPhone from './categories/printImg-phone.jpg'
import uiDesignImgPhone from './categories/uiDesignImg-phone.jpg'
import packagingDesignImgPhone from './categories/packaging-phone.jpg';
import motionImgPhone from './categories/motionImg-phone.jpg';

// Define an array of category data with icon, alt, and name
  const services = [
    { icon: logoDesign,
      img: logoDesignImg,
      phone: logoDesignPhone,
      for:'Skin care line',
      alt: 'Logo-Design', 
      name: 'تصميم شعار',
      desc: 'إنشاء رمز مميز وجذاب بصريًا أو علامة رسومية تمثل شركة أو علامة تجارية أو منظمة.',
      tags: [
        'Minimalist logo', 
        'Vintage Logo', 
        'Abstract Logo', 
        'Emblem Logo'
      ] 
    },

    { icon: brandingDesign,
      img: brandingDesignImg,
      phone: brandingDesignImgPhone,
      for:'',
      alt: 'Branding-Design',
      name: 'تصميم هوية',
      desc: `عملية الإبداع في تشكيل وتمثيل هوية العلامة التجارية وقيمها وشخصيتها بصريًا من خلال استخدام الشعارات وأنماط الخط ومخططات الألوان وعناصر التصميم الأخرى لإنشاء صورة علامة تجارية مميزة ولا تُنسى.`,
      tags: [
        'Brand Identity',
        'Stationery Design', 
        'Packaging Design', 
        'Brand Style Guides', 
        'Business Card Design'
      ]
    },

    { icon: illustration, 
      img: illustrationsImg,
      phone: illustrationsPhone,
      for:'simple illustration',
      alt: 'Illustration', 
      name: 'الفن والرسوم التوضيحية',
      desc: `يشمل الرسم إنشاء سرد بصري من خلال أشكال فنية مختلفة، بما في ذلك رسم الشخصيات والرسوم التوضيحية الرقمية وفن السيناريو ورسوم كتب الأطفال ورسوم الخيال`,
      tags: [
        'Character Illustration',
        'Digital Illustrations',
        'Concept Art',
        "Children's Book Illustrations",
        'Fantasy Illustrations'
      ],
  },
  
    { icon: printDesign, 
      img: printDesignImg,
      phone: printDesignImgPhone,
      for: 'For a coffee shop',
      alt: 'Print-Design', 
      name: 'المطبوعات',
      desc: `إنشاء محتوى بصري وتخطيطات مقصودة للمواد المطبوعة المادية، مثل الكتيبات والملصقات والمجلات والتغليف. يشمل استخدام أساليب الطباعة والصور والألوان وعناصر التصميم الأخرى لنقل المعلومات والجماليات في شكل ثابت وملموس`,
      tags: [
        "Brochure Design",
        "Flyer Design",
        "Poster Design",
        "Magazine Layout Design",
        "Catalog Design",
      ],
    },

    { icon: uiux, 
      img: uiDesignImg,
      phone: uiDesignImgPhone,
      for: '',
      alt: 'User-Interface', 
      name: 'واجهة وتجربة المستخدم',
      desc: `تتضمن صياغة واجهات رقمية سهلة الاستخدام للمواقع الإلكترونية وتطبيقات الهواتف المحمولة. تركز على التخطيط والجماليات وتجربة المستخدم لإنشاء تفاعلات عبر الإنترنت مشوقة. يلعب المصممون دورًا حاسمًا في تقديم تجربة رقمية إيجابية وسهلة الاستخدام للمستخدم`,
      tags: [
        "Website Design",
        "Mobile App Interface Design",
        "UX/UI Design",
        "Landing Page Design",
        "E-commerce Design"
      ],
    },

    { icon: packaging, 
      img: packagingDesignImg,
      phone: packagingDesignImgPhone,
      for: 'Healthy Chocolate package',
      alt: 'Packaging', 
      name: 'التعبئة والتغليف',      
      desc: `فن إنشاء تعبئة وتغليف جذابة بصريًا ووظيفية للمنتجات. يتضمن الاستخدام الاستراتيجي للرسومات والألوان والعناصر الهيكلية لجذب المستهلكين ونقل المعلومات وحماية المحتوى. يلعب التصميم الفعال للعبوة دورًا كبيرًا في التسويق والعلامة التجارية، ويؤثر في اختيارات المستهلكين على الرف التجاري.`,
      tags: [
        "Product Packaging",
        "Label Design",
        "Box Design",
        "Food Packaging",
        "Beverage Packaging"
      ],
    },

    { icon: motion, 
      img: motionImg,
      phone: motionImgPhone,
      for:'',
      alt: 'Motion', 
      name: 'التحريك',
      desc: `يجمع بين العناصر البصرية والنصية والصوتية لإنشاء محتوى متحرك. يُستخدم غالبًا في الوسائط المتعددة والإعلانات وإنتاج الفيديو لنقل المعلومات أو سرد القصص أو تعزيز جاذبية العروض المرئية`,
      tags: [
        "Explainer Videos",
        "Logo Animations",
        "Kinetic Typography",
        "2D/3D Animation",
        "Animated Infographics"
      ],
    },

    { icon: socialMedia, 
      alt: 'Social-media', 
      name: 'مواقع التواصل',
      desc: `إنشاء محتوى بصري، مثل الصور واللافتات والإعلانات، مصممة خصيصًا لمنصات التواصل الاجتماعي. يهدف إلى جذب المستخدمين وتعزيز وجود العلامة التجارية من خلال رسومات جذابة بصريًا وقابلة للمشاركة.`,
      tags: [
        "Social Media Posts",
        "Cover and Banner Design",
        "Profile Picture Design",
        "Social Media Ads",
        "Social Media Campaigns"
      ],
    },
];

  export default services;