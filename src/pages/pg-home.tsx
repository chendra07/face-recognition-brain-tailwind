import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { z } from "zod";
import clsx from "clsx";

//redux
import { RootState } from "../redux/store";

//requests
import { Button, Card } from "../components";

//utils
import {
  faceBoxCalculatorPosition,
  ImageCalcOutput,
} from "../utils/imageUtils";
import FaceRecognition from "../components/home/faceRecognition";
import { httpPostDetectFace } from "../requests/image";
import { Form, Input } from "antd";

export default function PgHome() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [inputImgForm, setinputImgForm] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [imageCoordinates, setimageCoordinates] = useState<ImageCalcOutput[]>(
    []
  );

  function handleDetectFace() {
    if (!inputImgForm) {
      toast.error("No input detected");
      return;
    }
    if (!z.string().url().safeParse(inputImgForm).success) {
      toast.error("invalid url, please check your input again");
      return;
    }

    setimageCoordinates([]);
    setimageUrl(inputImgForm);
    setisLoading(true);
    httpPostDetectFace({ imageUrl: inputImgForm }, currentUser?.token)
      .then((imgCoordinates) => {
        const calculatedImageCoordinates = faceBoxCalculatorPosition(
          imgCoordinates.regions
        );

        setimageCoordinates(calculatedImageCoordinates);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message);
      })
      .finally(() => setisLoading(false));
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
        <Form
          name="loginForm"
          className="flex flex-1 px-4 scr-400-less:flex-col"
          onFinish={(_) => handleDetectFace()}
          onFinishFailed={(error) => console.log("Error: ", error)}
          autoComplete="off"
        >
          <Input
            name="imageUrl"
            type="url"
            placeholder="Paste your image url here..."
            onChange={(e) => setinputImgForm(e.target.value)}
          />
          <Button.Outline className="mx-4 p-2" action={handleDetectFace}>
            Detect
          </Button.Outline>
        </Form>
      </Card>

      {imageUrl && (
        <FaceRecognition
          image={imageUrl}
          isLoading={isLoading}
          coordinates={imageCoordinates}
        />
      )}
    </div>
  );
}
