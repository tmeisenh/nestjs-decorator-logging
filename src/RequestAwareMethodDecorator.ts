import { Inject } from '@nestjs/common';
import { RequestAwareLogger } from './RequestAwareLogger';

// This needs to be good and unique so that the chances of the class this monkey-patches does not have this property
const collisionSafeProperty =
  'injectedRequestAwareLoggerFromRequestAwareMethodDecorator';

interface WithRequestAwareLoggerHack {
  [collisionSafeProperty]: RequestAwareLogger;
}

/**
 * This decorator logs method entry and exits using an injected logger
 * (such as Services for example).
 * This a simple example of a Typescript Method Decorator that utilizes a nest-js managed dependency.
 */
export function RequestAwareMethodDecorator() {
  const monkeyPatch = Inject(RequestAwareLogger);
  return (
    target: object,
    propertyKey: string | symbol,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    // monkey patch the target, aka, the class
    // property name collisions are a thing
    monkeyPatch(target, collisionSafeProperty);
    const originalMethod = propertyDescriptor.value;
    const className = target.constructor.name;
    propertyDescriptor.value = async function (...args: Array<unknown>) {
      const logger: RequestAwareLogger = (this as WithRequestAwareLoggerHack)[
        collisionSafeProperty
      ];
      logger.debug(`${className}:${originalMethod.name}`, 'decorator-entry', {
        args,
      });
      try {
        const result = await originalMethod.apply(this, args);
        logger.debug(`${className}:${originalMethod.name}`, 'decorator-exit', {
          result,
        });
        return result;
      } catch (error) {
        // log?
        throw error;
      }
    };
  };
}
