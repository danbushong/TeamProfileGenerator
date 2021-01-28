const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//what is this for???
const render = require("./lib/htmlRenderer");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
//??
const outputPath = path.join(OUTPUT_DIR, "team.html");


function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([
        {
            message: "Enter team members name",
            name: "name"

        },
        {
            type: "list",
            message: "Select team member's role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],

            name: "role"

        },
        {
            message: "Enter team member's id",
            name: "id"
        },
        {
            message: "Enter team member's email address",
            name: "email"
        }])
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                addMember();
                            } else {
                                finishHtml();
                            }
                        });

                });
        });

}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    My Amazing Team
                </div>`;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        
        let data = "";
        if (role === "Engineer") {
            const roleInfo = member.getGithub();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ id }</li>
                    <li class="list-group-item">Email: <a href="mailto:${email}">${ email }</a></li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${roleInfo}" target="_blank" rel="noopener noreferrer">${roleInfo}]</a></li>
                    
                </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const roleInfo = member.getSchool();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${ name }</h2>
                <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${ role }</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ id }</li>
                    <li class="list-group-item">Email: <a href="mailto:${ email }">${ email }</a></li>
                    <li class="list-group-item">School: ${ roleInfo }</li>
                </ul>
            </div>
            </div>`;
        } else {
            const roleInfo = member.getOfficeNumber();
            data = `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${ name }</h2>
                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${ role }</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${ id }</li>
                    <li class="list-group-item">Email: <a href="mailto:${ email }">${ email }</a></li>
                    <li class="list-group-item">Office number: ${ roleInfo }</li>
                </ul>
            </div>
        </div>`;
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });

}

function finishHtml(){
    const html = `</div>
    </div>
    
    </body>
    </html>`;


    fs.appendFile("./output/team.html",html, function (err){
        if(err){
            console.log(err);

        };

    });
    console.log("end");
}





initApp();


