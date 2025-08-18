// Webpack config for the Products remote (port 3001).
// Exposes product UI components and consumes the host's shared store.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // Async bootstrap entry (see src/index.tsx)
  entry: "./src/index.tsx",
  output: {
    // Auto publicPath for MF
    publicPath: "auto",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    // Resolve TS/JS by default
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        // Transpile TypeScript
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // Tailwind + PostCSS
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    // Remote on 3001
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
      // Unique name and manifest for this remote.
      // Other apps will import it via `products@http://.../remoteEntry.js` in their `remotes`.
      name: "products",
      filename: "remoteEntry.js",
      // Components this remote exposes
      exposes: {
        "./ProductList": "./src/ProductList",
        "./ProductCard": "./src/ProductCard",
      },
      // Host container reference for consuming shared store.
      // The key `host` must match the host's `name` value.
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      // Share singletons to align React/Zustand versions with host
      shared: {
        react: { singleton: true, requiredVersion: "18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "18.2.0" },
        zustand: { singleton: true, requiredVersion: "4.5.2" },
      },
    }),
  ],
};
