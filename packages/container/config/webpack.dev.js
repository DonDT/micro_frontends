const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // the remote files we are receiving //
        // the keys are the names of the various modules exposed that we are receiving.
        // the values are where the remote entry files are for that value...
        // marketing@http://localhost:8081/remoteEntry.js , marketing is the name
        // exposed in the marketing webpack config.
        // the marketing to the left is used to load the right url, where marketing runs
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      //shared: ["react", "react-dom"], avoid duplicate downloads
      shared: packageJson.dependencies,
    }),
  ],
};

// Listing out devConfig second allows it to override any commonConfig
module.exports = merge(commonConfig, devConfig);
