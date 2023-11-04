#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function Welcome() {
    let rainbowTitle = chalkAnimation.rainbow("\t\t\t\t\t--------------ATM--------------");
    await sleep();
    rainbowTitle.stop();
}
await Welcome();
const ans = await inquirer.prompt([
    {
        type: "input",
        name: "AccNo",
        message: "\n\t----- Enter Your Account Number : "
    },
    {
        type: "number",
        name: "Pin",
        message: "\n\t----- Enter Your Pin : "
    },
    {
        type: "list",
        name: "transaction",
        choices: ["deposit", "withdraw"],
        message: "\n\t----- Select Your Transaction",
    },
    {
        type: "list",
        name: "amount",
        choices: [500, 1000, 2000, 5000, 10000, 50000],
        message: "\n\t----- Select The Amount ",
        when(answer) {
            return answer.transaction == "deposit";
        },
    },
    {
        type: "list",
        name: "amount",
        choices: [500, 1000, 2000, 5000, 10000, 50000],
        message: "\n\t----- Select The Amount ",
        when(answer) {
            return answer.transaction == "withdraw";
        },
    }
]);
if (ans.AccNo && ans.Pin) {
    const balance = Math.floor(Math.random() * 100000);
    console.log(`\n\t----- Your Current balace is ${balance}`);
    const inpAmount = ans.amount;
    let finalAmount = 0;
    if (ans.transaction === "deposit") {
        finalAmount = balance + inpAmount;
        console.log(chalk.greenBright(`\n\t----- After depositing ${inpAmount}. Your current balance is ${finalAmount}.`));
    }
    else {
        if (balance <= inpAmount) {
            console.log(chalk.redBright("\n\t\tInsufficient balance !!"));
        }
        else {
            finalAmount = balance - inpAmount;
            console.log(chalk.greenBright(`\n\t----- After withdrawing ${inpAmount}. Your current balance is ${finalAmount}.`));
        }
    }
}
