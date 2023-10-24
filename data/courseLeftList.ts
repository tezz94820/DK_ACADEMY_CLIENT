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
      href: "#",
      icon: '/all.svg'
    },
    {
      id: '2',
      name: "PYQ Video Courses",
      href: "#",
      icon: '/video.svg'
    },
    {
      id: '3',
      name: "PYQ PDF chapter wise",
      href: "#",
      icon: '/document.svg'
    },
    {
      id: '4',
      name: "Mathematics",
      href: "#",
      icon: '/maths.svg'
    },
    {
        id: '5',
        name: "Chemistry",
        href: "#",
        icon: '/chemistry.svg'
      },
      {
        id: '6',
        name: "Physics",
        href: "#",
        icon: '/physics.svg'
      },
      {
        id: '7',
        name: "Practice",
        href: "#",
        icon: '/practice.svg'
      },
      {
        id: '8',
        name: "Weekly Test",
        href: "#",
        icon: '/test.svg'
      },
      {
        id: '9',
        name: "Test Series",
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