export default class {
  static bindMethods(o, methods) {
    const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(o));

    methodNames.forEach((methodName) => {
      if (methods.includes(o[methodName])) {
        o[methodName] = o[methodName].bind(o);
      }
    });
  }
}