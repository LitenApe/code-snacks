---
title: Log Adapter
date: 2022-11-12
---

In the previous post, I spoke about logging levels and their meaning, but how should we create a logger which can be used throughout our codebase? More importantly, how can we create a logger which are resistant to change? Like many other dependencies, our logs destination might change over time, depending on various factors. It might for example change depending on environment, or maybe the company you are working for had to change due to cost, feature or other aspects.

Creating an adapter that translates whatever you and your team are using into a standarized interface for the codebase will therefore be a key factor to reduce future workload. Another bonus is that you will get better control over which log levels are actually activated, dependending on you environments configuration.

How I like to do it is to create a class for adapters, as it creates a namespace when interacting with a given service in the codebase, making it easier to see and spot where certain functionality is coming from. In this case, we will create a class `Logg`, with a constructor that takes in all necessary parameters, as shown below:

```typescript
class Logg {
  #name: string;
  #level: Level;
  #src: Source;

  constructor(name: string, level: Level, source: Source) {
    // assign arguments to class attributes
  }
}
```

The snippet above is pretty straight forward, we create a class named `Logg`, which takes a name, level and source as argument. Level is the lowest logg level we want to use in the environment which the code is running in, while source is the actual logger. The one who does the heavy lifting, and outputs your loggs to whichever destination that is configured.

Then, you create a method for each logg level that is supported, where all of them works as a multiplexer that funnels the calls into one single method which formats and adds meta information before invoking the respective method on the source instance. You will then end up with something like this:

```typescript
private logg(level: Level, ...message: Array<unknown>): void {
  if(!mute(this.#level, level)) {
    this.#src[level](`[name=${this.#name}]: ${message.join(" ")}`);
  }
}

trace(...args: Array<unknown>): void {
  this.logg('trace', args);
}

// define methods for all logg levels you are operating with
```

The private method `logg` is there to append `[name=${this.#name}]` as a prefix while confirming if the logg should be recorded or not. The method `mute`, which has yet to be mentioned confirms whether or not the message should be ignored or not. It is simply comparing the two arguments position in an array, and returns a boolean depending on whether or not we have muted that particular level.

This is essentially all you need to create a logg adapter which can be used throughout the codebase, while toggling on and off various levels of verbosity based on the environment it is currently running in.

To make it easier to use the `Logg` class, i would highly recommend creating a factory, to help you create new logg instances, so you don't need to send inn the level and source manually every time. The factory in itself is really simple to create, as you can see below:

```typescript
function factory(level: Level, source: Source): (name: string) => Logger {
  return function (name: string): Logger {
    new Logger(name, level, source);
  };
}
```

Now you can create new logg instances without worrying about the environments level and source every time. Name however, is something I like to have to make it easier to locate and understand where a logg statements was created. Feel free to disregard it if you feel that it is unnecessary.

I didn't go into detail on everything written out, as I felt it would be really boring to read about the type decleration and such, but you can find a working example in the attached file, which shows how I use the service in combination with `console`.

## Attachments

List of all attachments mentioned in the post

- [logger.ts](ghf://logg_adapter/logger.ts)
