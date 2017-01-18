export function throttle(fn, threshhold = 250, context = this) {
  let last
      ,deferTimer;

  return function() {
    const now = +new Date;
    const args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
