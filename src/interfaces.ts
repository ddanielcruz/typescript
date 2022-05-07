interface Named {
  readonly name: string
  preferredName?: string
}

interface Animal extends Named {
  move(): void;
}

class Dog implements Animal {
  readonly name: string = 'Dog';
  preferredName?: string | undefined = 'Marvel';

  move(): void {
    console.log('Dog is moving');
  }
}

const dog = new Dog();
dog.move();

// type AddFn = (a: number, b: number) => number;
interface AddFn { (a: number, b: number): number;}
const add: AddFn = (a, b) => a + b;
console.log(`Sum is ${add(5, 2)}`);
