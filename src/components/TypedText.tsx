'use client';

import { useState, useEffect } from 'react';

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
}

export default function TypedText({
  strings,
  typeSpeed = 60,
  backSpeed = 35,
  backDelay = 1500,
}: TypedTextProps) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullString = strings[stringIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, backSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setText((prev) => currentFullString.slice(0, prev.length + 1));
      }, typeSpeed);
    }

    if (!isDeleting && text === currentFullString) {
      timer = setTimeout(() => setIsDeleting(true), backDelay);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, stringIndex, strings, typeSpeed, backSpeed, backDelay]);

  return (
    <span className="text-rose-500 font-bold border-r-2 border-rose-500 pr-1 animate-pulse-slow">
      {text}
    </span>
  );
}
