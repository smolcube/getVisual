
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


// Define an array of category data with icon, alt, and name
  const services = [
    { icon: logoDesign,
      img: logoDesignImg,
      for:'Skin care line',
      alt: 'Logo Design', 
      name: 'تصميم شعار',
      desc: 'creation of a distinctive and visually appealing symbol or graphic mark that represents a company, brand, or organization.',
      tags: [
        'Minimalist logo', 
        'Vintage Logo', 
        'Abstract Logo', 
        'Emblem Logo'
      ] 
    },

    { icon: brandingDesign,
      img: brandingDesignImg,
      for:'',
      alt: 'Branding Design',
      name: 'تصميم هوية',
      desc: `the creative process of shaping and visually representing a brand's identity, values, and personality through the use of logos, typography, color schemes, and other design elements to establish a distinctive and memorable brand image.`,
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
      for:'simple illustration',
      alt: 'Illustration', 
      name: 'الفن والرسوم التوضيحية',
      desc: `Illustration involves the creation of visual narratives through various art forms, including character illustration, digital illustrations, concept art, children's book illustrations, and fantasy illustrations.`,
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
      for: 'For a coffee shop',
      alt: 'Print Design', 
      name: 'المطبوعات',
      desc: `Creating visual content and layouts intended for physical, printed materials, such as brochures, posters, magazines, and packaging. It involves the use of typography, images, colors, and other design elements to convey information and aesthetics in a tangible, static format.`,
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
      for: '',
      alt: 'User Interface', 
      name: 'واجهة وتجربة المستخدم',
      desc: `Entails crafting user-friendly digital interfaces for websites and mobile apps. It focuses on layout, aesthetics, and user experience to create engaging online interactions. Designers play a crucial role in delivering a positive and user-friendly digital experience.`,
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
      for: 'Healthy Chocolate package',
      alt: 'Packaging', 
      name: 'التعبئة والتغليف',
      desc: `The art of creating visually appealing and functional packaging for products. It involves the strategic use of graphics, colors, and structural elements to attract consumers, convey information, and protect the contents. Effective package design plays a significant role in marketing and branding, influencing consumer choices on the retail shelf.`,
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
      for:'',
      alt: 'Motion', 
      name: 'التحريك',
      desc: `Combines visual elements, text, and audio to create animated content. It is often used in multimedia, advertising, and video production to convey information, tell stories, or enhance the visual appeal of video presentations.`,
      tags: [
        "Explainer Videos",
        "Logo Animations",
        "Kinetic Typography",
        "2D/3D Animation",
        "Animated Infographics"
      ],
    },

    { icon: socialMedia, 
      alt: 'Social media', 
      name: 'مواقع التواصل',
      desc: `the creation of visual content, such as images, banners, and ads, tailored for social media platforms. It aims to engage users and enhance brand presence through visually appealing and shareable graphics.`,
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