import { useEffect, useState } from "react";
import Image from "next/image";
import rgbDataURL from "../utils/rgbDataUrl";

export default function CustomImage({ src, alt, error, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(error);
      }}
      placeholder="blur"
      blurDataURL={rgbDataURL(249, 250, 251)}
    />
  );
}
