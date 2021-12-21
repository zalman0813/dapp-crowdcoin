module.exports = {
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { electron: false };
  
      return config;
    },
  };