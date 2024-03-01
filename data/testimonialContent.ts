interface TestimonialContentType {
    profilePhoto: string,
    parent: boolean,
    name: string,
    videoPoster: string,
    video: string,
    textContent:string
}
export const testimonialContent: TestimonialContentType[] = [
    {
        name:"Chirayu Sethia",
        profilePhoto:'/homepage/testimonials/student_photo.png',
        video:"/homepage/testimonials/student.mp4",
        videoPoster:'/homepage/testimonials/student_poster.png',
        parent:false,
        textContent:"DK Academy, a game-changer in my JEE prep. Under the guidance of DK Sir, I conquered exam fears, identified weaknesses, and gained time-saving strategies. His friendly approach and holistic support boosted my confidence. The key mantra: stay humble with success, resilient with setbacks. Highly recommend DK Academy for transformative learning!"
    },
    {
        name:"Rahul Jindal",
        parent:true,
        profilePhoto:'/homepage/testimonials/parent_1_photo.png',
        video:"/homepage/testimonials/parent_1.mp4",
        videoPoster:'/homepage/testimonials/parent_1_poster.png',
        textContent:"DK Academy, a game-changer in my JEE prep. Under the guidance of DK Sir, I conquered exam fears, identified weaknesses, and gained time-saving strategies. His friendly approach and holistic support boosted my confidence. The key mantra: stay humble with success, resilient with setbacks. Highly recommend DK Academy for transformative learning!"

    },
    {
        name:"Rinki Trivedi",
        parent:true,
        profilePhoto:'/homepage/testimonials/parent_2_photo.png',
        video:"/homepage/testimonials/parent_2.mp4",
        videoPoster:'/homepage/testimonials/parent_2_poster.png',
        textContent:"DK Academy, a game-changer in my JEE prep. Under the guidance of DK Sir, I conquered exam fears, identified weaknesses, and gained time-saving strategies. His friendly approach and holistic support boosted my confidence. The key mantra: stay humble with success, resilient with setbacks. Highly recommend DK Academy for transformative learning!"

    },
]