import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollTrigger = (selector: string) => {
    gsap.utils.toArray(selector).forEach((card: any, index: number) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%', // يبدأ عند دخول العنصر بنسبة 80% من الشاشة
                end: 'top 20%', // ينتهي عند 20% من الشاشة
                scrub: true, // يجعل الأنيميشن يتبع الحركة
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            scale: 0.8,
            rotation: 10,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.2, // تأخير بناءً على الترتيب
        });
    });
};
