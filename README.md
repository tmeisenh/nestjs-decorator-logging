# what is this?

This is a `nest.js` project that "showcases" ...

1. a custom logger, `CustomLogger` and how to configure and use it.
2. a http.Request aware logger, `RequestAwareLogger`, and how to configure and use it. This gives us the ability to grab information from the http.Request at any point in a controller/service/anything-nestjs-manages. This is useful if you have a "tracer header" or other information in the request you want to tack on to logs.
3. A custom Typescript Method Decorator, `RequestAwareMethodDecorator`, that utilizes a nest.js managed Logger to log method entry and exit. This is very useful for debugging as it gives you easy access to input and output from methods without mucking up the code.

```
@Injectable()
export class SomeService {

  @RequestAwareMethodDecorator()
  getHello(str: string): string {
    return `Hello ${str}`;
  }
}
```

This would log something like...

on entry

```
The CustomLogger - "{\"level\":\"debug\",\"origin\":\"AppService:getHello\",\"message\":\"decorator-entry\",\"data\":{\"args\":[\"test\"]},\"url\":\"/demo\",\"method\":\"GET\"}"
```

on exit

```
The CustomLogger - "{\"level\":\"debug\",\"origin\":\"AppService:getHello\",\"message\":\"decorator-exit\",\"data\":{\"result\":\"Hello test\"},\"url\":\"/demo\",\"method\":\"GET\"}"
```
