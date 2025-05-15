import React, { useEffect, useState } from 'react'

const useDimensions = () => {
    const [width , setWidth ] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        function reset() {
          setHeight(window.innerHeight);
          setWidth(window.innerWidth);
        }
        window.addEventListener("resize", () => reset());
        return () => window.removeEventListener("resize" , () => reset());
    } ,[]);
  return (
    {width , height}
  )
}

export default useDimensions