const { performance } = require('perf_hooks');

const myEventEmitter = require('./task1');

class WithTime extends myEventEmitter {


  async execute(asyncFunc, ...args) {
    this.emit('begin');
    const cb = (result) => {
      this.emit('end');
      
      console.log('start', this.start, 'end', this.end);
      console.log('result', result);
    }
    await asyncFunc(args, cb.bind(this));
  }
}

const fetchFromUrl = async (url, cb) => {
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      cb(data);
    })
    .catch(err => {
      cb(err);
    }) 
}


const withTime = new WithTime();

withTime.on('begin', () => {
  console.log('About to execute');
  withTime.start = performance.now();
});

withTime.on('end', () => {
  withTime.end = performance.now();
  console.log('Done with execute');
});

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));