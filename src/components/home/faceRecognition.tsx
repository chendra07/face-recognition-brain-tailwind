import React from "react";
import clsx from "clsx";

type faceRecognitionProps = {
  image: string;
  coordinates: {
    leftCol: number;
    topRow: number;
    rightCol: number;
    bottomRow: number;
  }[];
};

export default function FaceRecognition({
  image,
  coordinates,
}: faceRecognitionProps) {
  return (
    <div className="mx-4 my-28 relative">
      <img
        id="inputimage"
        src={image}
        alt="input image"
        width={"500px"}
        height={"auto"}
      />
      {coordinates.map((imgCoordinate, i) => (
        <div
          key={i}
          className={clsx(
            "absolute flex flex-wrap justify-center z-[3]",
            "shadow-[0_0_0_3px_rgba(20,157,242,1)_inset]"
          )}
          style={{
            zIndex: 3,
            top: imgCoordinate.topRow,
            right: imgCoordinate.rightCol,
            bottom: imgCoordinate.bottomRow,
            left: imgCoordinate.leftCol,
          }}
        ></div>
      ))}
    </div>
  );
}
