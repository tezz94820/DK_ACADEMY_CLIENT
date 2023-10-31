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
    href: "/courses",
    icon: '/courses.svg'
  },
  {
    name: "Achievements",
    href: "/achievements",
    icon: '/services.svg'
  },
  {
    name: "About",
    href: "/about",
    icon: '/about.svg'
  },
  
];