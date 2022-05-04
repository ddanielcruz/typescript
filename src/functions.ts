function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

// Definition of a functional type, specifying the parameters and expected return type, pretty useful for callbacks
const pointer: (name: string) => void = greet
pointer('Daniel');

// Definition of a callback function type
function withCallback(callback: (name: string) => void) {
  callback('Callback')
}

withCallback(console.log);
