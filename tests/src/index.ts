import { argv } from "process";
import { exec } from "child_process";

if(!argv[2]) {
	throw new Error("Please Specify which tests to run (builder/decorator)");
} else if(argv[2] == "builder") {
	exec(`node ${__dirname}/builder`);
} else if(argv[2] == "decorator") {
	exec(`node ${__dirname}/decorator`);
} else {
	throw new Error("Invalid Argument... Only Builder or Decorator is allowed...");
}