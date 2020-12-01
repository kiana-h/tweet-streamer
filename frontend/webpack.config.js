const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./javascripts/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  targets: {
                    chrome: "80",
                  },
                  corejs: 3,
                },
              ],
            ],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[name]_[local]-[hash:base64:3]" },
              importLoaders: 1,
              url: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
    }),
  ],
};
