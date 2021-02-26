import React,{useState,useEffect} from 'react';

export default function useWindowWidth(initialWidth=0){
  const [windowWidth, setWindowWidth] = useState({width:process.browser ? window.innerWidth:initialWidth});

    useEffect(() => {
      const getSize = () => {
        return {width:process.browser ? window.innerWidth:initialWidth};
      }

      const handleResize = () => {
        setWindowWidth(getSize());
      }

      window.addEventListener('resize',handleResize);

      return () => {
        window.removeEventListener('resize',handleResize);
      }
    }, []);

    return windowWidth;

}