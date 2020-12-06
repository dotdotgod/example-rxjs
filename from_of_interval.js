const Rx = require("rxjs");
const { take } = require("rxjs/operators");
// console.log(Rx);

// 어레이로부터 만들기 (from)
const deliveries = ["delivery1", "delivery2", "delivery3"];

const stream = Rx.from(deliveries);

stream.subscribe({
  next: (data) => {
    //데이터가 오면 다음에 뭘 할지
    console.log(data);
  },
  complete: () => {
    // 데이터가 끝나면 뭘 할지
  },
  error: (err) => {
    // 에러가 나면 뭘 할지
  },
});

// 프로미스로부터 만들기 (from)

function makePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("delivery");
    }, 3000);
  });
}

// Rx.from(makePromise()).subscribe({
//   next: (data) => {
//     console.log(data);
//   },
// });

// 싱글 여러 데이터로부터 만들기 (of)

Rx.of("delivery1", "두번째 택배", "세번째 택배").subscribe({
  next: (data) => {
    console.log(data);
  },
});

const stream1 = Rx.interval(1000);

stream1.pipe(take(10)).subscribe({
  next: (data) => {
    console.log(data);
  },
});

const stream2 = Rx.timer(3000, 1000);

stream2
  .pipe(take(10))
  .subscribe({ next: (data) => console.log(data + "timer") });
