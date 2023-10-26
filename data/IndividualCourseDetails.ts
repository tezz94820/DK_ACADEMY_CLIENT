export type DescriptionType = {
    title?: string;
    content: string; 
    id: string;
}[]

export type TeachersType = {
    name:string;
    image:string;
    experience:string;
    subject:string;
    id: string;
}

export interface IndividualCourseType {
    id: string;
    title: string;
    type: string;
    new: boolean;
    thumbnail: string;
    class: string;
    price: string;
    old_price: string;
    discount: string;
    courseLink: string;
    lecturesCount: string;
    duration: string;
    language: string;
    description: DescriptionType;
    teachers: TeachersType[];
}
  
export const IndividualCourseDetails:IndividualCourseType = {
    id: "1",
    title: "PYQ Quadratic Video Course",
    type: 'course',
    new: true,
    thumbnail: '/thumb.png',
    class: "JEE Aspirants 11th and 12th",
    price: "2500",
    old_price: "5000",
    discount: "50",
    courseLink: "https://www.dkacademy.com",
    lecturesCount: "90",
    duration: "110",
    language: "English",
    description:[
        {
            id:"1",
            title: 'Duration',
            content: "90 lectures with 110 hrs of learning"
        },
        {
            id: "2",
            title: 'Validity',
            content: "LifeTime"
        },
        {
            id: "3",
            content: "DPP's with test solutions"
        },
        {
            id: "4",
            content: "One-to-One telephonic PTM basedon personialised approach"
        },
        {   id: "5",
            content: "Access to All india Test Series"
        },
        {   
            id: "6",
            content: "Provided with the solutions in PDF format"
        },
        {
            id: "7",
            content: "One-to-One telephonic PTM basedon personialised approach"
        },
        {   id: "8",
            content: "Access to All india Test Series"
        },
        {   
            id: "9",
            content: "Provided with the solutions in PDF format"
        }
    ],
    teachers: [
        {
            id: "1",
            name: "Dharmendra kumar",
            image: '/dksir.png',
            experience: "5 Years",
            subject: "Maths"
        }
    ]
}