const fs = require("fs");
const path = require('path');
const inquirer = require('inquirer');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const opn = require('opn');

const render = require('./lib/htmlRenderer');
const OUTPUT_DIR = path.resolve(__dirname, "output")

const outputPath = path.join(OUTPUT_DIR, "team.html");
const employees = []
const confirm = [{
    message: 'Add an employee?',
    type: 'confirm',
    name: 'confirm'
}]
const questions = [{
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
    },
    {
        type: "input",
        name: "name",
        message: "What is your name?",

    },
    {
        type: "input",
        name: "id",
        message: "What is your id?",
        //validate: function(validate){
            //const done = this.async()
          //  if(typeof validate !== 'number'){
         //       done('Not a number')
          //      return done(true)
          //  }
       // }

    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    }
]

const engineerQ = [{
    type: "input",
    name: "github",
    message: "What is your github?",
}]
const internQ = [{
    type: "input",
    name: "school",
    message: "What school did you go to?"

}]
const managerQ = [{
    type: "input",
    name: "officeNumber",
    message: "What is your office number?"

}]

const engineer = async (data) => {
    const res = await inquirer.prompt(engineerQ)
    const e = new Engineer(data.name, data.id, data.email, res.github)
    employees.push(e)
    init()
}


const manager = async (data) => {
    const res = await inquirer.prompt(managerQ)
    const e = new Manager(data.name, data.id, data.email, res.officeNumber)
    employees.push(e)
    init()
}

const intern = async (data) => {
    const res = await inquirer.prompt(internQ)
    const e = new Intern(data.name, data.id, data.email, res.school)
    employees.push(e)
    init()
}

const exit = async (data) => {
    let myRender = await render(employees)
    fs.writeFile(outputPath, myRender, ()=>{

    })

}



const init = async () => {
    const choice = await inquirer.prompt(confirm)
    if (choice.confirm) {
        const res = await inquirer.prompt(questions)
        switch (res.role) {
            case 'Manager':
                return manager(res)
            case 'Engineer':
                return engineer(res)
            case 'Intern':
                return intern(res)
            default:
                console.log('default')
                break;
        }
    } else {
        exit(employees)
        console.log('end pf program')

    }
}




init()