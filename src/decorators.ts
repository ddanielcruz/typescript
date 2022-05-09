// Class decorators, used to apply some logic in the class constructor
function ConstructorDecorator(constructor: Function) {
  console.log('Plain decorator, receiving constructor function', constructor);
}

function ConstructorFactoryDecorator(message: string) {
  console.log('Factory decorator, receiving a parameter and returning the decorator');
  return function(_: Function) {
    console.log(message);
  }
}

function NewConstructorDecorator<T extends {new(...args: any): {}}>(originalConstructor: T) {
  return class extends originalConstructor {
    constructor(...args: any[]) {
      console.log('Performing logic on a new constructor');
      super(...args);
    }
  }
}

// Decorators run in descending order, which means it runs from bottom to top, 
// but the factories run in ascending order, from top to bottom
@ConstructorDecorator
@ConstructorFactoryDecorator('Running after factories')
@NewConstructorDecorator
class Cat {
  constructor(public readonly name: string) {
    console.log(`Creating cat "${this.name}"\n`);
  }
}

new Cat('Meg');

// Property and method decorators, used to apply logic in the class information.
// Property decorators run after its usage, even before instantiating the class.
function PropertyDecorator(_target: any, propertyName: string | Symbol) {
  // Target is the property of the object (Product class in this case)
  console.log(`Property decorator, property "${propertyName}"`);
}

// Accessor decorators are used on getter and setter methods, and they also run right after the definition
function AccessorDecorator(_target: any, accessorName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log(`Accessor decorator, accessor "${accessorName}", descriptor "${JSON.stringify(descriptor)}"`);  
}

// Method decorators are exact the same as accessor because behind the scenes they are similar structures
function MethodDecorator(_target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log(`Method decorator, method "${methodName}", descriptor "${JSON.stringify(descriptor)}"`);  
}

// Example method decorator to automatically bind a method
function AutoBind(_target: any, methodName: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const changedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod?.bind(this);
    }
  };

  return changedDescriptor;
}

// Parameter decorators apply logic in parameters, and it receives the param position instead of its name
function ParameterDecorator(_target: any, methodName: string | Symbol, position: number) {
  console.log(`Parameter decorator, method "${methodName}", parameter #${position}`);
}


class Product {
  private _price: number;
  
  @PropertyDecorator
  public readonly title: string
  
  @AccessorDecorator
  public set price(value : number) {
    if (value <= 0) {
      throw new Error('Price must be greater than zero.')
    }

    this._price = value;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @AutoBind
  @MethodDecorator
  public getPriceWithTax(@ParameterDecorator tax: number): number {
    return this._price * (1 + tax);
  }
}

// All decorators were executed prior to instantiating the product, right after their definitions
new Product('Book', 40);
