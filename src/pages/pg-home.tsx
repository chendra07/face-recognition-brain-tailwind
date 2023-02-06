import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import clsx from "clsx";

//requests
import { FormInput, Button, Card } from "../components";

//utils
import {
  faceBoxCalculatorPosition,
  ImageCalcOutput,
} from "../utils/imageCalculator";
import FaceRecognition from "../components/home/faceRecognition";

export default function PgHome() {
  const [inputImgForm, setinputImgForm] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [imageCoordinates, setimageCoordinates] = useState<ImageCalcOutput[]>(
    []
  );

  function handleDetectFace() {
    if (!z.string().url().safeParse(inputImgForm).success) {
      toast.error("invalid url, please check your input again");
      return;
    }

    setimageUrl(inputImgForm);

    //todo: create img request and set every coordinates to useState
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1
        className={clsx(
          "mb-12 text-5xl text-center",
          "scr-500-less:text-4xl scr-400-less:text-3xl scr-300-less:text-2xl",
          "text-slate-500 dark:text-gray-200"
        )}
      >
        This Magic Brain will detect faces in your pictures. Give it a try!
      </h1>
      <Card className="w-full">
        <div className={clsx("flex flex-1", "scr-400-less:flex-col")}>
          <FormInput.Text
            name="imageUrl"
            className="flex-1 scr-400-less:mx-0"
            placeholder="Put your image url here..."
            onChange={(e) => setinputImgForm(e.target.value)}
          />
          <Button.Outline className="my-2 mx-4" action={handleDetectFace}>
            Detect
          </Button.Outline>
        </div>
      </Card>
      {imageUrl && (
        <FaceRecognition image={imageUrl} coordinates={imageCoordinates} />
      )}
    </div>
  );
}
