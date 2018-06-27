function postFormData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let arr = '';
      ctx.req.on("data", (chunk) => {
        arr += chunk;
      })
      ctx.req.on("end", () => {
        resolve(arr);
      })
    } catch (err) {
      reject(err);
    }
  })
}
exports.postFormData = postFormData;