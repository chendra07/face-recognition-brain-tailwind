import React from "react";
import clsx from "clsx";
import { icons } from "../../assets";

type faceRecognitionProps = {
  image: string;
  isLoading: boolean;
  coordinates: {
    leftCol: number;
    topRow: number;
    rightCol: number;
    bottomRow: number;
  }[];
};

export default function FaceRecognition({
  image,
  isLoading,
  coordinates,
}: faceRecognitionProps) {
  return (
    <div className="mx-4 my-28 relative">
      {isLoading && (
        <div
          className={clsx(
            "absolute flex z-[4] h-full w-full items-center justify-center",
            "bg-slate-700 opacity-90"
          )}
        >
          <img src={icons.loadingWhite} alt="loading..." />
        </div>
      )}
      <div className="max-w-[500px]">
        <img
          id="inputimage"
          src={image}
          alt="input image"
          onError={({ currentTarget }) => {
            currentTarget.src = icons.invalidImg;
          }}
          className="max-w-full h-auto z-[2]"
        />
      </div>
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
