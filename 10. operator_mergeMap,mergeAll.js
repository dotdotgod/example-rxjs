const Rx = require("rxjs");
const { mergeMap, take, mergeAll, map, tap } = require("rxjs/operators");

const stream = Rx.interval(1000).pipe(
  take(3),
  map((data) => `택배${data + 1}`)
);

function openBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 개퐁");
      resolve(data);
    }, 5000);
  });
}

function checkBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 검사");
      resolve(data);
    }, 5000);
  });
}

function useProduct(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 사용");
      resolve(data);
    }, 5000);
  });
}

// promise를 반환
async function userTask(data) {
  await openBox(data);
  await checkBox(data);
  await useProduct(data);
}

// merge (map)
// stream.pipe(mergeMap((data) => Rx.from(userTask(data)))).subscribe();

// merge (all)
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream0 = Rx.of(stream1, stream2, stream3);

stream0.pipe(mergeAll()).subscribe({ next: console.log });
