const app = require("./index");

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
