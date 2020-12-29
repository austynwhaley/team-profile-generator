let inquirer = require ("inquirer");
let fs = require("fs");
let Engineer = require("./lib/Engineer");
let Manager = require("./lib/Manager");
let Intern = require("./lib/Intern");

const addEmployee = () =>
inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Please enter employee name.",
    },
    {
        type:"input",
        name:"id",
        message:"What is the employees ID number?"
    },
    {
        type:"input",
        name:"email",
        message:"What is the employees email address?"
    },
    {
        type:"list",
        message:"Select employee role.",
        name:"role",
        choices:['Manager','Engineer','Intern']
    },
]).then(function({role}){

    if(role === "Manager") {
        inquirer.prompt([{type:"input",name:"officeNum",message:"What is the employee's office number?"}]);
    } else if (role === "Engineer"){
        inquirer.prompt([{type:"input", name:"github",message:"What is the employee's Github username?"}]);
    } else if (role === "Intern") {
        inquirer.prompt([{type:"input", name:"school",message:"What school did this employee attend?"}])
    }
})

addEmployee()