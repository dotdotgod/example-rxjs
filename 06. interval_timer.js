const Rx = require("rxjs");
const { take } = require("rxjs/operators");

const stream = Rx.interval(1000);

stream.pipe(take(10)).subscribe({
  next: (data) => console.log(data),
});

const stream2 = Rx.timer(3000, 1000);

stream2.pipe(take(10)).subscribe({
  next: (data) => console.log(data),
});
