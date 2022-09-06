const Rx = require("rxjs");
const { take, tap, filter, map, reduce } = require("rxjs/operators");

const stream = Rx.from([1, 2, 3, 4]);

// tap
// stream
//   .pipe(
//     tap((data) => console.log("한번 읽었다: ", data)),
//     tap((data) => console.log("두번 읽었다: ", data)),
//     tap()
//   )
//   .subscribe({
//     next: (data) => console.log("구독했어요: ", data),
//   });

// filter
// stream
//   .pipe(
//     filter((data) => data > 1),
//     filter((data) => data < 4)
//   )
//   .subscribe({ next: console.log });

// map
// stream.pipe(map((data) => data * 2)).subscribe({ next: console.log });

// reduce
stream
  .pipe(
    reduce((acc, cur, index) => {
      acc[index] = cur;
      return acc;
    }, {})
  )
  .subscribe({ next: console.log });
