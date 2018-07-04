module.exports = (newTime, oldTime) => {
  var sumTime = newTime - oldTime;
  // var days = Math.floor(sumTime / (24 * 3600 * 1000));
  // var leave1 = sumTime % (24 * 3600 * 1000);
  // var hours = Math.floor(leave1 / (3600 * 1000));
  // var leave2 = leave1 % (3600 * 1000);
  // var minutes = Math.floor(leave2 / (60 * 1000));
  // var leave3 = leave2 % (60 * 1000);
  // var seconds = Math.round(leave1 / 1000);
  var seconds = parseInt((sumTime) / 1000);
  return seconds;
}