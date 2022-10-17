---
title: Log Levels
date: 2022-10-17
---

Logging is a crucial tool in our day to day work. It sheds light on problems and helps us understand how and why the system behaves the way it does. It can, however, be difficult to understand what you can and cannot log, especially with different environemts and laws.

You want as much information as possible recorded, but having too much consumes all available disk space very quickly. Another common problem with too much recorded information is also traceability, as the data might create a vulnerability, where there is too much information that can be connected to a specific person.

This is where log levels come into play. Log levels allows us to record as much information as possible regarding our systems, and dial down the verbosity and detail level based on our environment or desired monitoration criterias.

Log levels are usually defined based on the degree of verbosity, where some levels are more commonly seen then others. Those are as follows, ranked from top to bottom based on importance in my point of view:

1. Critical: Records system events which result in your service essentially being unavailable. You never want to encounter a log of critical level in production, as that means everything is in flames. Usually associated with critical depedencies being unreachable, like databases or important first-, second- or third-party services which you cant operate without and no backup solution exists.
2. Error: System events which prevent us from achieving a desired outcome, most likely caused by unexpected state. Commonly due to malformed data or unresposive dependencies which. These kind of events does not affect all users of the system, but creates complications for a few.
3. Warning: System events which we expect might happen due to events getting triggered out of order or due to system states that should not be possible. These types or incidents have known fixes for which can be applied on the go, but should be kept an eye on, as it might indicate a bug if they are too frequent.
4. Information: General recordings of state changes, too trace where and how data is modified if we modify any data inbetween the layers of our system.
5. Debug: Verbose recordings of events where variables and state is recorded inside a method or function to allow us to understand the context of an event. Mostly used for local development and test environments to speed up bug searches and fixes.
6. Trace: Super verbose recordings of where we move around in our codebases. Essentially tells us which functions and methods gets invoked to help us see how data moves through our system. Super verbose as mentioned, and commonly used for local development.

The mentioned log levels above are my definition and instructions on how to use the various log levels. There are many definitions which are quote similar, if not identical, as they are shaped from reading an handful of articles. There are, however, many different ways of using these log levels. You might not even be able to use all these levels or have a few levels available which is not mentioned here depending on the logging tool you are using. However, no matter how you yourself define the various levels, just remember to make sure that you and your team is aligned on how the various levels should be used. Consistency is king after all.
