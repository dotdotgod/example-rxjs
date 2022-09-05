const Rx = require("rxjs");
// console.log(Rx);

// 어레이로부터 만들기 (from)
const deliveries = ["delivery1", "delivery2", "delivery3"];

const stream = Rx.from(deliveries);

stream.subscribe({
  next: (data) => {
    console.log(data);
  }, // 다음 대이터가 왔을때 행동,
  complete: () => {
    console.log("complete");
  }, // 데이터가 다 완료됐을 때 행동,
  error: (err) => {}, // 에러가 났을 때 콜백
});

// 프로미스로부터 만들기 (from)
function makePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("delivery"), 3000);
  });
}

Rx.from(makePromise()).subscribe({
  next: (data) => {
    console.log(data);
  }, // 다음 대이터가 왔을때 행동,
  complete: () => {
    console.log("complete");
  }, // 데이터가 다 완료됐을 때 행동,
  error: (err) => {}, // 에러가 났을 때 콜백
});

// 싱글 여러 데이터로부터 만들기 (of)
Rx.of("delivery1", "두번째 택배", "세번째 택배").subscribe({
  next: (data) => {
    console.log(data);
  }, // 다음 대이터가 왔을때 행동,
  complete: () => {
    console.log("complete");
  }, // 데이터가 다 완료됐을 때 행동,
  error: (err) => {}, // 에러가 났을 때 콜백
});
