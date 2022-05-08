// Generic types, a flexible definition of a type used by another structure such as a Class or Array
const names: Array<string> = ['Daniel'];
const promise = new Promise<string>(resolve => resolve('any-value'));
promise.then(value => value.split('-'));

// TypeScript understands the result will be an intersection of T and U, but it doesn't care their exact types.
// The "extends" keyword is a constraint to force a base object type to avoid errors.
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Daniel' }, { age: 24 }));

// Generics also allow us to define a base structure to parameters/objects, giving flexibility on the concrete
// type because the function itself doesn't care about it besides the expected structure
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(value: T): string {
  return `Length: ${value.length}`;
}
countAndDescribe('any-string');
countAndDescribe(['any-string']);

// The "keyof" constraint ensures the passed key is a valid key of T
function extractAndConvert<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}
console.log(extractAndConvert({ name: 'Daniel' }, 'name'));

// We can also create generic classes, used to define a common structure/class with flexible properties and parameters
class DataStorage<T extends number | string | boolean> {
  private _data: T[] = [];

  public get data() : T[] {
    return [...this._data];
  }
  

  add(item: T) {
    this._data.push(item);
  }
}

const textStorage = new DataStorage<string>();
textStorage.add('any-value');

// Partial is an utility type used to make all type properties optional, specially useful when mocking a service for testing
interface Person {
  name: string
  age: number
}
const person: Partial<Person> = { name: 'Daniel' };

// Readonly is another utility type used to make an object immutable
const techs: Readonly<string[]> = ['Node.js'];
// techs.push('JavaScript');
