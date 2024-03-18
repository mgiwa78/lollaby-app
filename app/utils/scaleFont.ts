import { PixelRatio } from "react-native";

export const scaleFont = (fontSize: number) => {
  const ratio = fontSize / 375; // Base font size for 375 width screen
  const newSize = fontSize + (PixelRatio.get() - 1) * ratio;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
