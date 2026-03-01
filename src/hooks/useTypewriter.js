import { useState, useEffect } from "react";

/**
 * Custom hook for typewriter cycling through an array of strings.
 * @param {string[]} texts - Array of strings to cycle through
 * @param {number} typeSpeed - Typing speed in ms (default 80)
 * @param {number} deleteSpeed - Delete speed in ms (default 50)
 * @param {number} pauseMs - Pause before deleting in ms (default 2000)
 */
export function useTypewriter(texts = [], typeSpeed = 80, deleteSpeed = 50, pauseMs = 2000) {
    const [displayed, setDisplayed] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!texts.length) return;

        const current = texts[textIndex];

        if (isPaused) {
            const timeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, pauseMs);
            return () => clearTimeout(timeout);
        }

        if (!isDeleting) {
            if (charIndex < current.length) {
                const timeout = setTimeout(() => {
                    setDisplayed(current.slice(0, charIndex + 1));
                    setCharIndex((c) => c + 1);
                }, typeSpeed);
                return () => clearTimeout(timeout);
            } else {
                setIsPaused(true);
            }
        } else {
            if (charIndex > 0) {
                const timeout = setTimeout(() => {
                    setDisplayed(current.slice(0, charIndex - 1));
                    setCharIndex((c) => c - 1);
                }, deleteSpeed);
                return () => clearTimeout(timeout);
            } else {
                setIsDeleting(false);
                setTextIndex((i) => (i + 1) % texts.length);
            }
        }
    }, [charIndex, isDeleting, isPaused, textIndex, texts, typeSpeed, deleteSpeed, pauseMs]);

    return displayed;
}
