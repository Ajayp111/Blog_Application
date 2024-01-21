import { useLayoutEffect, useRef } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css";

const ImageCarousel = () => {
  const flickityRef = useRef(null);

  useLayoutEffect(() => {
    let animationFrameId;

    const initializeFlickity = () => {
      flickityRef.current = new Flickity(".carousel", {
        cellAlign: "left",
        contain: true,
        wrapAround: true,
        pageDots: false,
      });
    };

    const handleAnimationFrame = () => {
      animationFrameId = requestAnimationFrame(() => {
        initializeFlickity();
      });
    };

    const delayInitialization = () => {
      animationFrameId = requestAnimationFrame(handleAnimationFrame);
    };

    const timeoutId = setTimeout(delayInitialization, 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);

      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="carousel w-5/5 mx-auto mt-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="carousel-cell border border-orange-500"
          key={index}
          style={{ border: "2px solid dark-orange" }}
        >
          <img
            src={`https://source.unsplash.com/random/800x400?sig=${index}`}
            alt={`Image ${index}`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
