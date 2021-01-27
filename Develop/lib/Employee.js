class Employee {
    constructor (name, id, email){
        this.name = name;
        this.id= id;
        this.email=email;
    }
    retrieveName(){
        return this.name;

    }
    retrieveID(){
        return this.id;
    }
    retrieveEmail(){
        return this.email;
    }
    retrieveJob(){
        return "Employee";

    }
}
module.exports = Employee;