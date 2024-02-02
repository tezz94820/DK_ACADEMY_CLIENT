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
      name: "PYQ Video courses",
      href: "/courses/pyq",
      icon: '/document.svg'
    },
    {
      id: '2',
      name: "Theory Video courses",
      href: "/courses/theory",
      icon: '/video.svg'
    },
    {
      id: '3',
      name: "Daily Practice Problem (DPP)",
      href: "/courses/dpp",
      icon: '/practice.svg'
    },
    {
      id: '4',
      name: "Ranker Questions",
      href: "/courses/ranker-questions",
      icon: '/test.svg'
    },
    {
      id: '5',
      name: "Test Series",
      href: "/courses/test-series",
      icon: '/test.svg'
    },
  ];