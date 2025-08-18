// Webpack config for the Host app (port 3000).
// This app is the shell that loads remote apps and exposes the shared Zustand store.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // Async bootstrap entry (see src/index.tsx) ensures MF share scope is ready before render
  entry: "./src/index.tsx",
  output: {
    // Let webpack determine public path at runtime (important for MF)
    publicPath: "auto",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    // Allow TS/JS imports without specifying extensions
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
        // Tailwind + PostCSS pipeline for CSS files
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    // Host app on 3000
    port: 3000,
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
      // Unique name for this container. MUST be unique across all MF builds.
      // Other apps reference this via their `remotes` (e.g., host@http://.../remoteEntry.js).
      name: "host",
      filename: "remoteEntry.js",
      // Remote apps that the host will load at runtime.
      // Keys here (products, cart) must match the `name` field in those remotes' configs.
      remotes: {
        products: "products@http://localhost:3001/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
      },
      // Expose the shared Zustand store so remotes can import `host/store`
      exposes: {
        "./store": "./src/store",
      },
      // Share singletons so all MF apps use the same React/Zustand instances
      shared: {
        react: { singleton: true, requiredVersion: "18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "18.2.0" },
        zustand: { singleton: true, requiredVersion: "4.5.2" },
      },
    }),
  ],
};
