const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email,github){
        super(name, id, email);
        this.github = github
    }
    retrieveJob(){
        return "Engineer"
    }
    retrieveGithub(){
        return this.github;
    }
}
module.exports = Engineer;