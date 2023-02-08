import { z } from "zod";
import { axiosRequest } from "../utils/axiosRequest";

const zodDetectFaceOutput = z.object({
  regions: z.array(
    z.object({
      id: z.string(),
      region_info: z.object({
        bounding_box: z.object({
          top_row: z.number(),
          left_col: z.number(),
          bottom_row: z.number(),
          right_col: z.number(),
        }),
      }),
      data: z.object({
        concepts: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            value: z.number(),
            app_id: z.string(),
          })
        ),
      }),
      value: z.number(),
    })
  ),
});

type DetectFaceOutput = z.infer<typeof zodDetectFaceOutput>;

export async function httpPostDetectFace(
  data: { imageUrl: string },
  token: string | undefined
) {
  return await axiosRequest
    .Post(null, "v1/image/detectface", data, {
      Authorization: `Bearer ${token || "undefined"}`,
    })
    .then((response) => {
      if (!zodDetectFaceOutput.safeParse(response.data).success) {
        throw new Error("Invalid data!, please contact the developer");
      }

      return response.data as DetectFaceOutput;
    });
}

//-----------------------------------------

const zodHistoryOutput = z.object({
  total: z.number().gte(0),
  data: z.array(
    z.object({
      historyid: z.number(),
      imageurl: z.string(),
      date: z.string(),
      userid: z.number(),
      isdeleted: z.boolean(),
    })
  ),
});

type HistoryOutput = z.infer<typeof zodHistoryOutput>;

export async function httpPostViewHistory(
  skip: number,
  limit: number,
  token: string | undefined
) {
  return await axiosRequest
    .Post(
      null,
      "v1/image/history",
      { skip, limit },
      {
        Authorization: `Bearer ${token || "undefined"}`,
      }
    )
    .then((response) => {
      if (!zodHistoryOutput.safeParse(response.data).success) {
        throw new Error("Invalid data!, please contact the developer");
      }

      return response.data as HistoryOutput;
    });
}
