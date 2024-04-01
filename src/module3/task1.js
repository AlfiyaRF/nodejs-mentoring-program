class MyEventEmitter {
  listeners = {};
 
  addListener(eventName, fn) {
    if (this.listeners[eventName]) {
      const fns = this.listeners[eventName];
      if (typeof fns === 'function') {
        this.listeners[eventName] = [fns, fn];
      } else {
        this.listeners[eventName] = [...fns, fn];
      }
    } else {
      this.listeners[eventName] = fn;
    }
  }
    
  on(eventName, fn) {
    this.addListener(eventName, fn);
  }
 
  removeListener(eventName, fn) {
    const fns = this.listeners[eventName];
    if (typeof fns === 'function') {
      delete this.listeners[eventName];
    } else {
      const fnIndex = fns.indexOf(fn);
      if (fnIndex > -1) {
        fns.splice(fnIndex, 1);
      }
      if (fns.length === 1) {
        this.listeners[eventName] = fns[0];
      }
    }
  }
    
  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }
 
  once(eventName, fn) {
    const onceFn = () => {
      this.removeListener(eventName, onceFn);
      fn();
    };
    this.addListener(eventName, onceFn);
  }
 
  emit(eventName, ...args) {
    const fns = this.listeners[eventName];
    if (typeof fns === 'function') {
      fns(args)
    } else if (typeof fns === 'object') {
      for (let i = 0; i < fns.length; i++) {
        fns[i](args);
      }
    }
  }
 
  listenerCount(eventName) {
    const fns = this.listeners[eventName];
    if (typeof fns === 'function') {
      return 1;
    } else if (typeof fns === 'object') {
      return fns.length;
    }
    return 0;
  }
 
  rawListeners(eventName) {
    const fns = this.listeners[eventName];
    if (typeof fns === 'function') {
      return [fns];
    } else if (typeof fns === 'object') {
      return [...fns];
    }
    return [];
  }
}

module.exports = MyEventEmitter;