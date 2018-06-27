function* outer() {
  yield '1';
  let ret = yield* inner();
  console.log(ret);
  yield '2';
}
function* inner() {
  yield '3';
  return 'in the 3 inner';
}

let it = outer(), v;
v = it.next().value;
console.log(v);

v = it.next().value;
console.log(v);

// v = it.next().value;
// console.log(v);