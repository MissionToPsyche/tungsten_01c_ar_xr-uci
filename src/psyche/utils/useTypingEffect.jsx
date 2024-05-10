import { useState, useEffect } from 'react';

function useTypingText(fullText, speed = 50) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');  // Reset text state when fullText changes
    const intervalId = setInterval(() => {
      setText(t => {
        // Check if the current text is less than the full text
        if (t.length < fullText.length) {
          return fullText.substring(0, t.length + 1);
        } else {
          clearInterval(intervalId); // Clear interval if end of text is reached
          return t;
        }
      });
    }, speed);

    return () => {
      clearInterval(intervalId); // Clean up the interval on unmount
    };
  }, [fullText, speed]); // Rerun the effect whenever fullText changes

  return text;
}

export default useTypingText;
