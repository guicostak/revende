import React, { useState, useEffect } from "react";
import { searchPlaceholders } from '../enums/searchPlaceholdersEnum'

export const useTypingEffect = () => {
  const [searchbarPlaceholder, setSearchbarPlaceholder] = useState('');
  const typingSpeed = 60;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    const intervalId = setInterval(() => {
      const currentPlaceholder = searchPlaceholders[placeholderIndex];

      if (isDeleting) {    
        setSearchbarPlaceholder(currentPlaceholder.substring(0, charIndex - 1));
        charIndex -= 1;

        if (charIndex === 0) {
          isDeleting = false;
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % searchPlaceholders.length);
        }
      } else {
        setSearchbarPlaceholder(currentPlaceholder.substring(0, charIndex + 1));
        charIndex += 1;

        if (charIndex > currentPlaceholder.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 300)
        }
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [placeholderIndex]);


  return searchbarPlaceholder;
};
