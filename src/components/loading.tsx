import React from "react";
import { icons } from "../assets";

type AdaptiveLoadingType = {
  isDark: boolean;
};

export default function AdaptiveLoading({ isDark }: AdaptiveLoadingType) {
  return (
    <img
      src={isDark ? icons.loadingBlack : icons.loadingWhite}
      className="w-[2.5rem] h-[2.5rem]"
      alt="loading..."
    />
  );
}
