module.exports = (api) => {
  api.cache(false);
  return {
    presets: ["next/babel"],
    plugins: ["./rpc.js"],
  };
};
