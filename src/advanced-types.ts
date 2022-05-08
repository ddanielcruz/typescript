// Intersection types, a simpler way to combine definitions than interfaces
type Admin = {
  name: string;
  privileges: string[]
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const employee: ElevatedEmployee = {
  name: 'Daniel',
  privileges: ['create-user'],
  startDate: new Date()
};

// Intersection types would use the common defined types below (number only), but with union types
// they would be combined, being three types (string, number and boolean)
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// Type guards, technique used to get information about the type of a variable
function combine(a: Combinable, b: Combinable): Combinable {
  // Checking type using "typeof"
  if (typeof a === 'string' || typeof b === 'string') {
    return `${a}${b}`;
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(employee: UnknownEmployee) {
  console.log(`Name: ${employee.name}`);

  // Checking if type has a key using "in". TypeScript already defines property type as array of strings,
  // and if I add an "else" case, it would show the "startDate" property as a date
  if ('privileges' in employee) {
    console.log(`Privileges: ${employee.privileges}`);
  }

  if ('startDate' in employee) {
    console.log(`Start date: ${employee.startDate}`);
  }
}
printEmployeeInformation(employee);

class Car {
  drive() {
    console.log('Driving a car');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck');
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo: ${amount}`);
  }
}

// Classes allow to define types using the "instanceof" keyword, similar to "typeof" but for other types
type Vehicle = Car | Truck;
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
useVehicle(new Truck());

// Discriminated unions, defining types using common properties describing the object.
// TypeScript detects possible values using this techniques, making it easier to work with.
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

function moveAnimal(animal: Bird | Horse) {
  const speed = animal.type === 'bird' ? animal.flyingSpeed : animal.runningSpeed;
  console.log(`Speed: ${speed}`);
}

// Index properties, used to define an object structure with flexible property names
// but fixed types, pretty useful for mapping
interface ErrorContainer {
  [key: string]: string;
};

const userError: ErrorContainer = {
  email: 'Email is invalid.',
  username: 'Username is already taken.'
};

// Function overloads, a feature that allows us to define multiple function signatures. It can be used
// to define the return value depending on the parameters, pretty useful when working with union types
function combineOverload(a: number, b: number): number
function combineOverload(a: string, b: string): string
function combineOverload(a: number, b: string): string
function combineOverload(a: string, b: number): string
function combineOverload(a: Combinable, b: Combinable): Combinable {
  return combine(a, b);
}

// Because of the overloads TypeScript is able to define result is a number
const result = combineOverload(1, 6);
