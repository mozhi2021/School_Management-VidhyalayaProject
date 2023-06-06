import React from "react";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`;
};

export default function NxtImage(props) {
  const { src, width, height, layout, ...other } = props;
  return (
    <Image
      loader={imageLoader}
      src={src}
      width={width || "100%"}
      height={height || "100%"}
      layout={layout || "fixed"}
      {...other}
    />
  );
}
