interface MobileNavLink{
    name: string;
    href: string;
    icon: string;
  }
  
  type MobileNavLinksType = MobileNavLink[];
  export const mobileNavLinks:MobileNavLinksType = [
    {
      name: "Home",
      href: "/",
      icon: '/home.svg'
    },
    {
      name: "PYQ Courses",
      href: "/courses/pyq",
      icon: '/document.svg'
    },
    {
      name: "Theory Courses",
      href: "/courses/theory",
      icon: '/video.svg'
    },
    {
      name: "Test Series",
      href: "/courses/test-series",
      icon: '/test.svg'
    },
    {
      name: "DPP",
      href: "/courses/dpp",
      icon: '/courses.svg'
    },
    {
      name: "Ranker Questions",
      href: "/courses/ranker-questions",
      icon: '/test.svg'
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      icon: '/contact-us.svg'
    }
    
  ];