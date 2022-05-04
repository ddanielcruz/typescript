// We don't know what will be the input, it's "unknown"
let input: unknown
input = 10;
input = 'Daniel';
console.log(input);

if (typeof input === 'string') {
  const typed: string = input;
  console.log(`Typed value: ${typed}`);
}

// Never is used to define a function that will "never" return a value, in this case because
// it always throw an error
function generateError(message: string, code: string): never {
  throw { message, code };
}

generateError('any-error', 'any-code');
