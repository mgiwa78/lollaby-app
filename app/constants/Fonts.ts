const Fonts = {
  ManropeBold: require("../assets/fonts/Manrope-Bold.ttf"),
  ManropeExtraBold: require("../assets/fonts/Manrope-ExtraBold.ttf"),
  ManropeExtraLight: require("../assets/fonts/Manrope-ExtraLight.ttf"),
  ManropeLight: require("../assets/fonts/Manrope-Light.ttf"),
  ManropeRegular: require("../assets/fonts/Manrope-Regular.ttf"),
  ManropeSemiBold: require("../assets/fonts/Manrope-SemiBold.ttf"),
  ManropeMedium: require("../assets/fonts/Manrope-Medium.ttf"),
};

export type FontFamily = keyof typeof Fonts;

export default Fonts;
