const { of, from, interval } = require("rxjs");
const {
  mergeAll,
  delay,
  tap,
  concatAll,
  take,
  map,
  bufferCount,
  reduce,
} = require("rxjs/operators");

/**
 * 복잡한 택배 시스템
 * 1000개의 택배가 1초에 한번씩 배송이 된다.
 * 택배를 받으면 그 즉시 아래의 작업을 실행한다.
 *
 * 1. 상품 개봉 (3초 소요)
 * 2. 상품 검사 (3초 소요)
 * 3. 상품 사용 (3초 소요)
 *
 * 이때 택배 회사에는 종업원이 3명 밖에 없기 때문에 위 작업은 최대 3명에 의해서 동시에 실행될 수 있다.
 * 즉, 동시에 4개 이상의 작업은 실행될 수 없다.
 *
 * 각 택배사들에 대해서 상품 사용까지 종료된 택배들은 10개씩 묶어서 공항으로 보낸다.
 */

function openBox(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap((delivery) => console.log(`${delivery}를 열었습니다.`))
  );
}
function checkProduct(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap((delivery) => console.log(`${delivery}를 검사했습니다.`))
  );
}
function userProduct(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap((delivery) => console.log(`${delivery}를 사용했습니다.`))
  );
}

function doTask(delivery) {
  const tasks = from([
    openBox(delivery),
    checkProduct(delivery),
    userProduct(delivery),
  ]);

  return tasks.pipe(
    concatAll(),
    reduce((acc, cur) => delivery)
  );
}

const deliveries = interval(1000).pipe(take(1000));

deliveries
  .pipe(
    map((delivery) => doTask(delivery)),
    mergeAll(3),
    bufferCount(10),
    tap(console.log)
  )
  .subscribe();
