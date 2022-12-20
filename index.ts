#! /usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk"
type answers = {
    userId: String,
    pin: Number,
    accType: String,
    options: String,
    cashAmount: number
};

const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 1000);
    })
}

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('SAIM ATM');
    await sleep();
    rainbowTitle.stop();

}
await welcome();
    

let Input :answers = await inquirer.prompt([
    {
        name: "userId",
        type: "string",
        message: " Kindly Enter Your User ID:"
    },
    {
        name: "pin",
        type: "number",
        message: "Kindly Enter your PIN:",
        when(answers) {
            return answers.userId
        }       
    },
    {
        name: "accType",
        type: "list",
        choices: ["Current Account", "Saving Account"],
        message: " Choose Account Type:",
        when(answers) {
            return answers.pin
        }
    },
    {
        name: "options",
        type: "list",
        choices: ["Fast Cash", "Balance Inquiry",  "Cash Withdraw"],
        message: "Choose Given Below:",
        when(answers) {
            return answers.accType
        }
    },
    {
        name: "cashAmount",
        type: "number",
        message: "Enter Amount:",
        when(answers) {
            return answers.options === "Cash Withdraw"
        }  
    },
    {
        name: "cashAmount",
        type: "list",
        choices: [1000, 3000, 5000, 10000],
        message: "Choose amount:",
        when(answers) {
            return answers.options === "Fast Cash"
        }  
    },
    {
       name: "cashAmount",
        type: "number",
        message: "Your Balance amount:",
        when(answers) {
            return answers.options === "Balance Inquiry" 
        }
    }

]);

const { userId, pin, cashAmount} = Input;

const Balance = Math.floor(Math.random() * 100000);
if(userId && pin && cashAmount) {
    console.log(Balance);
    if(Balance > cashAmount){
        let CurrentBalance = Balance - cashAmount;
        console.log(`Transaction Sucessful. \nYour CurrentBalance is ${CurrentBalance}PKR`);
        
    }else {
        console.log("Insuficient Balance");
        
    }
    
}
