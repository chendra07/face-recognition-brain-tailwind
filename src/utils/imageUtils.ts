import axios from "axios";

type ImageBox = {
  id: string;
  region_info: {
    bounding_box: {
      top_row: number;
      left_col: number;
      bottom_row: number;
      right_col: number;
    };
  };
  data: {
    concepts: {
      id: string;
      name: string;
      value: number;
      app_id: string;
    }[];
  };
  value: number;
};

export type ImageCalcOutput = {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
};

export function faceBoxCalculatorPosition(
  clarifaiCoordinates: ImageBox[]
): ImageCalcOutput[] {
  const image = document.getElementById("inputimage") as HTMLImageElement;
  const width = Number(image?.width);
  const height = Number(image?.height);

  return clarifaiCoordinates.map((face) => {
    const { bottom_row, left_col, right_col, top_row } =
      face.region_info.bounding_box;

    return {
      leftCol: left_col * width,
      topRow: top_row * height,
      rightCol: width - right_col * width,
      bottomRow: height - bottom_row * height,
    };
  });
}

export function isUrlValid(url: string) {
  axios.get(url).then((response) => {
    const contentType = response.headers.hasContentType;

    if (contentType) {
      console.log("content: ", contentType);
    }
  });
}
