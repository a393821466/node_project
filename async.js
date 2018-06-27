// let a = (resolve, reject) => {
//   setTimeout(() => {
//     let [a, b, c] = [1, 2, 3];
//     console.log(a);
//   }, 2000);
// }
// let b = new Promise(a);
// b.then(rs => {
//   console.log(rs);
// })

// let a = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       var name = 'hello';
//       console.log(name);
//     }, 2000);
//   })
// }
// let b = a();
// b.then(rs => {
//   console.log(rs);
// })

// async function a() {
//   return 'hello'
// }
// async function b() {
//   var c = await a();
//   console.log(c);
// }
// b();

async function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let b = '阿拉里搭建';
      resolve(`我在啦啦啦${b}111`);
    })
  })
}
async function b() {
  let c = await a();
  // c.then(rs => {
  //   console.log(rs);
  // })
  console.log(c);
}
b();