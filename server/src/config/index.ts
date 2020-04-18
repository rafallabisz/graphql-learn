const port = Number(process.env.PORT) || 4000;
const API_URI = `http://localhost:${port}/graphql`;

const config_api = {
  port,
  API_URI,
};

export default config_api;
