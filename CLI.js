let inquirer = require ("inquirer");
let fs = require("fs");
let Engineer = require("./lib/Engineer");
let Manager = require("./lib/Manager");
let Intern = require("./lib/Intern");

function employeePrompt() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter employee name",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employees ID number?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address.",
        name: "email"
    },
    {
        type: "list",
        name: "role",
        message: "Select employee role.",
        choices: ["Manager","Engineer","Intern"],    

    }]).then(function({name, role, id, email}) {

        if(role === "Manager") {
            inquirer.prompt([
            {
                type: "input", 
                name: "roleQuestion", 
                message: "What is the employee's office phone number?"
            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add another employee?",
                choices: ["Yes","No"]
            }
            ]).then(function({roleQuestion, addEmployee}) {
                let newEmployee = new Manager(name, id, email, roleQuestion);
                addHtml(newEmployee).then(function(){if (addEmployee === "Yes"){employeePrompt();}else{finishHtml()}})
            });
        }
    
        else if (role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input", 
                    name: "roleQuestion", 
                    message: "What is the employee's Github username?"
                },
                {
                    type: "list",
                    name: "addEmployee",
                    message: "Would you like to add another employee?",
                    choices: ["Yes","No"]
                }
            ]).then(function({roleQuestion,addEmployee}) {
                let newEmployee = new Engineer(name, id, email, roleQuestion);
                addHtml(newEmployee).then(function(){if (addEmployee === "Yes"){employeePrompt();}else{finishHtml()}})
            });
        } else {
            inquirer.prompt([
                {
                    type: "input", 
                    name: "roleQuestion", 
                    message: "What is the employee's school name?"
                },
                {
                    type: "list",
                    name: "addEmployee",
                    message: "Would you like to add another employee?",
                    choices: ["Yes","No"]
                }
                
            ]).then(function({roleQuestion, addEmployee}) {
                let newEmployee = new Intern(name, id, email, roleQuestion);
                addHtml(newEmployee).then(function(){if (addEmployee === "Yes"){employeePrompt();}else{finishHtml()}})
            });
        }
    });
}

    
function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
        .jumbotron{
        box-sizing: border-box;
        font-family: 'Audiowide', cursive;
    }
    </style>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron  bg-dark text-white mb-3 team-heading">
                    <h1 class="text-center header">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(employee) {
    return new Promise(function(resolve, reject) {
        let html = "";
        if (employee.getRole() === "Engineer") {
            html = `<div class="col-4">
            <div class="card" style="width:20rem">
                <h5 class="card-header text-white bg-danger">${employee.getName()}<br /><br />Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID:${employee.getId()}</li>
                    <li class="list-group-item">Email:${employee.getEmail()}</li>
                    <li class="list-group-item">Github: <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>
                </ul>
            </div>
            </div>`;
        } else if (employee.getRole() === "Intern") {
            html = `<div class="col-4">
            <div class="card" style="width:20rem">
                <h5 class="card-header text-white bg-warning">${employee.getName()}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID:${employee.getId()}</li>
                    <li class="list-group-item">Email:${employee.getEmail()}</li>
                    <li class="list-group-item">School:${employee.getSchool()}</li>
                </ul>
            </div>
            </div>`;
        } else {
            html =  `<div class="col-4">
            <div class="card" style="width:20rem">
                <h5 class="card-header text-white bg-primary">${employee.getName()}<br /><br />Manager</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${employee.getId()}</li>
                    <li class="list-group-item">Email: ${employee.getEmail()}</li>
                    <li class="list-group-item">Office number:${employee.getOfficeNumber()}</li>
                </ul>
            </div>
        </div>`
        }
        console.log("Employee added");
        fs.appendFile("./output/team.html", html, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });   
}

function finishHtml() {
    const html = `</div>
        </div>
    </div>

    <br>

    </body>

    </html>
    `;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Team Profile generated");
};


startHtml()
employeePrompt()