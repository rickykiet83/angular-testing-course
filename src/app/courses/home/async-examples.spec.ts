import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

import { delay } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";

describe('Async Testing Examples', () => {

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {

    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => { });

    setTimeout(() => {
      console.log('running assertions setTimeout()');

      test = true;
      expect(test).toBeTruthy();
    }, 1000);

    flush();

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    Promise.resolve().then(() => {
      console.log('Promise first then() evaluated successfully');
      test = true;
      return Promise.resolve();
    })
      .then(() => {
        console.log('Promise second then() evaluated successfully');
      });

    flushMicrotasks();

    console.log('Running test assertions');
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promise + setTimeout()', fakeAsync(() => {

    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;

        setTimeout(() => {
          counter += 1;
        }, 1000);
      });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {

    let test = false;

    console.log('Creating Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log('Running test assertions');

    expect(test).toBe(true);

  }));

});
