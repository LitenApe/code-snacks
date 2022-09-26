---
title: Delayed Execution
date: 2022-09-26
---

## Table of Content

- [Throttle](#throttle)
- [Debounce](#debounce)
- [Closing Words](#closing-words)

From time to time, we might need to delay and reduce the number of executions invoked, due to performance or cost. The terms most commonly associated with this kind of operation is throttling or debouncing. They are two different tools in a developers toolkit, which are quite similar, but solves different problems. In other words, debounce and throttle prevents a function from running too frequently.

## Throttle

Throttling, as the name might suggest, means that we are temporarily reducing the amount of executions, by limiting how often a given function or method is allowed to execute. Creating your own throttle is quite straightforward, and should be preferred, in my opinion, rather then trusting a third-party library. As mentioned, a throttle limits how often a piece of code is allowed to run, in JavaScript terminology, that means a timer. Creating a timer with the help of `setTimout` allows us to create a throttle which ensures that there is a minimum set time elapsed since last execution. Below you can see a suggested implementation of a throttle function.

```
function throttle<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
) {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P) {
    if (timer === undefined) {
      func(...params);

      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  };
}

const throttledConsoleLogger = throttle(console.log)
```

[throttle.ts](ghf://delayed_execution/throttle.ts)

The throttle function above might look intimidating with all the typing, but is actually quite straight forward when we begin to dissect it. Our throttle function takes in any function we wish to throttle and returns a new function which can be used in-place of the originally intended function. We are, in other words creating a throttled version of whichever function that is passed as argument to our function.

The generic syntax `<P extends Array<unknown>>` is to help us maintain type safety, by maintaing the same type siganture between the original and throttled function. The `...params` syntax means that we want to allow for a variable number of parameters, which results in all function argument getting passed to us as an array of arguments, which we then send over to `func` to allow it to be invoked with the correct arguments.

The most important piece of code, however, is the `if-statement`, which literally ignores everything as long as a timeout is attached to our window. A `timeout` will be created and cleanup after itself by controlling the `timer` variable indicate whether it is possible to execute the desired function or not.

## Debounce

Debounce, will very similar to throttle in many ways, but has a very important difference. Debounce will prevent a function from executing until a specified time has elapsed since we last attempted to invoke it. Which means that while throttle reduces the number of execution, debounce might in many cases reduce the number of exections to one, which is a huge benefit when updating state based on user input. You can find a suggested implementation of a debounce function below.

```
function debounce<P extends Array<unknown>>(
  func: (...params: P) => void,
  delay = 300,
): (...params: P) => void {
  let timer: NodeJS.Timeout | undefined;

  return function (...params: P): void {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...params);
      timer = undefined;
    }, delay);
  }
}
```

[debounce.ts](ghf://delayed_execution/debounce.ts)

The function above is almost identical to `throttle`, with one important differences. We are clearing the timeout every time the debounced function is invoked, and creating a new timeout, essentially resetting the timer for when we want to execute our function. Other then that, we see that everything is essentially similar, yet different to solve their own problems.

## Closing Words

Debounce and throttle are two tools which I find essential in my toolkit, as they helps me reduce the amount of request I make towards whichever service I integrate with whenever the requests are a direct result from a user typing or changing values in a form. They are quite easy to implement and test, which is why I would encourage you to implement your own intead of relying on third-party libraries. However, if performance is an essential part of your work, then I would instead use a highly popular third-party library, as those are guaranteed to be alot more performant then the snippets shown above. You are, however, loosing a little bit of control of your code, as you now have to put trust into someone elses code to operate without any malicious code.
