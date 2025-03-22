interface navLink{
  name: string;
  href: string;
  icon: string;
}

type navLinksType = navLink[];
export const navLinks:navLinksType = [
  {
    name: "Home",
    href: "/",
    icon: '/home.svg'
  },
  {
    name: "Courses",
    href: "/courses/pyq",
    icon: '/courses.svg'
  },
  {
    name: "Achievements",
    href: "/achievements",
    icon: '/services.svg'
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: '/contact-us.svg'
  },
  
];