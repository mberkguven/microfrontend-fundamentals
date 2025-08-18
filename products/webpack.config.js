const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "auto",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/ProductList",
        "./ProductCard": "./src/ProductCard",
      },
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "18.2.0" },
        zustand: { singleton: true, requiredVersion: "4.5.2" },
      },
    }),
  ],
};
