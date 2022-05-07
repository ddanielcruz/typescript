// Basic class definition
class Department {
  private readonly _id: number = Date.now();
  protected readonly _employees: string[] = [];

  public get employees(): string[] {
    return [...this._employees];
  }

  constructor(public readonly name: string) {}

  public describe(this: Department): void {
    console.log(`Department (${this._id}): ${this.name}`);
  }

  public hire(this: Department, ...employees: string[]): void {
    this._employees.push(...employees);
  }
}

const department = new Department('Marketing');
department.describe();
department.hire('Daniel', 'Max');
console.log(department.employees);

// Without the name property TypeScript would complain because it's not a Department,
// as defined in the "describe" method above
// const departmentCopy = { name: 'Technology', describe: department.describe };
// departmentCopy.describe()

// Class inheritances
class TechnologyDepartment extends Department {
  private static _instance: TechnologyDepartment
  
  private constructor(public readonly admins: string[]) {
    super('Technology');
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new TechnologyDepartment(['Daniel']);
    }
    
    return this._instance;
  }

  public hire(this: Department, ...employees: string[]): void {
      console.log(`Hiring ${employees.length} employee(s)`);
      super.hire(...employees);
  }
}

const techDepartment = TechnologyDepartment.getInstance()
techDepartment.hire('Max');
console.log(techDepartment.employees);
console.log(techDepartment === TechnologyDepartment.getInstance());

// Definition of an abstract class
abstract class Food {
  constructor(public readonly name: string) {}

  public eat(): void {
    console.log(`Eating ${this.name}`);
  }

  abstract describe(): void
}

class Meat extends Food {
  constructor() {
    super('Meat');
  }

  describe(): void {
    console.log('Well, this is a meat');
  }
}

const food: Food = new Meat();
food.eat();
food.describe();
