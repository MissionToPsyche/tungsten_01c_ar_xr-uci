import { useState, useEffect, useRef } from 'react';

function useDoubleClick(callback, delay = 300) {
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const clickRef = useRef(0);

  useEffect(() => {
    const handleClick = (event) => {
			//console.log('event', event.target.tagName);
      //if (event.target.tagName.toLowerCase() === 'a' || event.target.type === 'button' || event.target.type === 'submit') {
      //  // Clickable element - ignore
      //  return;
      //}
      
      //console.log('event', event.target.tagName);
			
			if (event.target.tagName.toLowerCase() === 'div'){
				clickRef.current++;

				if (clickRef.current === 2) {
					setIsDoubleClick(true);
					callback();
				}
	
				setTimeout(() => (clickRef.current = 0), delay);
			}
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [callback, delay]); // Re-run effect on callback or delay change

  return isDoubleClick;
}



export default useDoubleClick;