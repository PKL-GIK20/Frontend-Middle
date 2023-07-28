// Parent class - Employee
function Employee(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }
  
  Employee.prototype.getDetails = function () {
    return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}`;
  };
  
  // Child class - Manager
  function Manager(name, age, salary, department) {
    Employee.call(this, name, age, salary); // Call parent constructor
    this.department = department;
  }
  
  // Inheritance
  Manager.prototype = Object.create(Employee.prototype);
  Manager.prototype.constructor = Manager;
  
  Manager.prototype.getDetails = function () {
    return `${Employee.prototype.getDetails.call(this)}, Department: ${this.department}`;
  };
  
  // Example usage
  const emp1 = new Employee("John Doe", 30, 50000);
  const mgr1 = new Manager("Jane Smith", 35, 70000, "HR");
  
  console.log(emp1.getDetails()); 
  console.log(mgr1.getDetails()); 
  