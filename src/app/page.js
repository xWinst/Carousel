"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import posts from "../db/posts.json";
import s from "./page.module.css";

const Home = () => {
    const listRef = useRef(null);
    const [visiblePost, setVisiblePost] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            // repeat: -1,
            defaults: {
                duration: 3,
                ease: "power1.inOut",
            },
        });

        const listItems = listRef.current.children;
        Array.from(listItems).forEach((item, index) => {
            gsap.set(item, { x: "0%" });
            if (index === visiblePost) tl.to(item, { x: "-500%" }, 0);
        });

        const interval = setInterval(() => {
            setVisiblePost((prev) => (prev + 1) % posts.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [visiblePost]);

    const getZIndex = (i) => {
        return i === visiblePost ? 10 : i > visiblePost ? -i : -(i + 1) * 10;
    };

    return (
        <main className={s.main}>
            <ul ref={listRef} className={s.list}>
                {posts.map(({ id, title, img, dscr }, i) => (
                    <li key={id} className={s.item} style={{ zIndex: getZIndex(i) }}>
                        <img src={img} alt="" width={500} />
                        <h2 className={s.title}>{title}</h2>
                        <p>{dscr}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Home;
