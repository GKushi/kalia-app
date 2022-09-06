module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "tailwindcss-react-native/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@/components": "./components",
            "@/utils": "./utils",
            "@/screens": "./screens",
          },
        },
      ],
    ],
  };
};
