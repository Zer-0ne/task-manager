'use client';
import React, { useEffect, useState } from 'react';

interface TypewriterProps {
    texts: string[]; // Array of texts to type
    speed?: number; // Speed of typing in milliseconds
    ref?: React.Ref<any>; // Optional ref
    style?: React.CSSProperties; // Optional inline styles
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed = 100, ref, style }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (isDeleting) {
                // Delete characters
                setDisplayedText(currentText.substring(0, displayedText.length - 1));
                if (displayedText === "") {
                    // Move to the next text
                    setIsDeleting(false);
                    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle back to 0 if at the end
                }
            } else {
                // Type characters
                setDisplayedText(currentText.substring(0, displayedText.length + 1));
                if (displayedText === currentText) {
                    // Wait before starting to delete
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1000); // Adjust this value for the pause duration
                }
            }
        }, isDeleting ? speed / 3 : speed); // Deleting is 3 times faster

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, speed, textIndex, texts]);

    return (
        <span ref={ref} style={style}>
            {displayedText}
            <span className={`cursor ${isDeleting ? 'deleting' : ''}`}>|</span>
        </span>
    );
};

export default Typewriter;
