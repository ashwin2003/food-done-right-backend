const app = require("./index");

const port = process.env.port;

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
