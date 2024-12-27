import ImageComponentProps from "@/Interfaces/Image";
import React from "react";
import Image from "next/image";

const ImageComponent: React.FC<ImageComponentProps> = (
 {   src,
  alt,
  width,
  height,
  className,
  containerClassName}
) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className}`}
      />
    </div>
  );
};

export default ImageComponent;
