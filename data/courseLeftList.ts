interface Link{
  id: string;
  name: string;
  href: string;
  icon: string;
}

type courseLeftListType = Link[];

export const courseLeftList:courseLeftListType = [
    {
      id: '1',
      name: "ALL",
      href: "/all",
      icon: '/all.svg'
    },
    {
      id: '2',
      name: "PYQ Video courses",
      href: "/courses/pyq-pdf/subject",
      icon: '/document.svg'
    },
    {
      id: '3',
      name: "Theory Video courses",
      href: "/courses/pyq",
      icon: '/video.svg'
    },
    {
      id: '7',
      name: "Practice",
      href: "#",
      icon: '/practice.svg'
    },
    {
      id: '8',
      name: "Test Series",
      href: "/courses/test-series",
      icon: '/test.svg'
    },
    {
      id: '9',
      name: "Weekly Test",
      href: "#",
      icon: '/all.svg'
    },
    {
      id: '10',
      name: "Coursxcses",
      href: "#",
      icon: '/all.svg'
    },
    {
      id: '11',
      name: "Servigthces",
      href: "#",
      icon: '/all.svg'
    },
    {
      id: '12',
      name: "Aboasasut",
      href: "#",
      icon: '/all.svg'
    },
  ];