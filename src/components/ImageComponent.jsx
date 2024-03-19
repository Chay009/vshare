import React from "react";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react";
import { useInView } from "react-intersection-observer";


const ImageComponent = ({ src, imgHash, className }) => {
 
 






  const [ref, inView] = useInView({
    triggerOnce: true, // Fetch only once when the component comes into view
    threshold:0.4
  });

  const placeholder = blurhashToCssGradientString(imgHash.encoded);

  const aspectRatio = (imgHash.height / imgHash.width) * 100;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${aspectRatio}%`,
        overflow: "hidden",
      }}
    >
      {inView && (
        <Image
          className={`${className} `}
          src={src}
          width={imgHash.width}
          height={imgHash.height}
          loading="lazy"
          background={placeholder}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};

export default ImageComponent;
