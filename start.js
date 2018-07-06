const app = require("./server/app");
const PORT = require("./server/config/config").PORT;
//监听端口
app.listen(PORT, () => {
  console.log('The server is running at http://localhost:' + PORT);
});