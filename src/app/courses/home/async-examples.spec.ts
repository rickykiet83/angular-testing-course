import { fakeAsync, flush, tick } from "@angular/core/testing";

fdescribe('Async Testing Examples', () => {

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

});
