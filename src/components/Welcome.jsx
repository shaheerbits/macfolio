import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{fontVariationSettings: `'wght' ${baseWeight}`}}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))
};

const setupTextHover = (container, type) => {
    if (!container) return () => {};

    // Getting a list of all span (letters) from the container
    const letters = container.querySelectorAll('span');

    // Getting font weights based on the type of text (title or subtitle)
    const { min, max, default: base } = FONT_WEIGHTS[type]; // ex. 400, 900, 400

    // animates a letter to a specific weight
    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(
            letter, 
            {  
                duration, 
                ease: "power2.out", 
                fontVariationSettings: `'wght' ${weight}`, 
            }
        );
    };

    // MouseMove Handler
    const handleMouseMove = (e) => {
        // Gets the left pos of the container (ex. 400)
        const { left } = container.getBoundingClientRect();
        // The mouse's x pos in the container (ex. if mouse if 500 from the left of the screen,
        // then this mouseX will be 500 - 400 == 100)
        const mouseX = e.clientX - left;

        // Itterate over each letter
        letters.forEach((letter) => {
            // Gets the left bound of the letter and its width (ex. 450, 60)
            const { left: l, width: w } = letter.getBoundingClientRect();

            const distance = Math.abs(mouseX - (l - left + w / 2)); // 20
            const intensity = Math.exp(-(distance ** 2) / 20000); // -(20 ** 2) / 20000 == -0.02 -> 2.71828 ** -0.02 == ~0.980199

            animateLetter(letter, min + (max - min) * intensity); // weight == 900 * 0.980199 == 882.17
        });
    };

    const handleMouseLeave = (e) => {
        letters.forEach((letter) => {
            animateLetter(letter, base, 0.3);
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            titleCleanup();
            subtitleCleanup();
        }
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Shaheer! Welcome to my", "text-3xl font-georama", 100)}
            </p>

            <h1 ref={titleRef} className="mt-3">
                {renderText("portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for Desktop/Tablet screens only.</p>
            </div>
        </section>
    )
};

export default Welcome