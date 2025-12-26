import inquirer from "inquirer";
import { MemorizationProgress } from "../types/types";
import { Context } from "../core/context";
import { Command } from "../core/command";

export class AddEntryCommand implements Command {
  constructor(private context: Context) {}
  async execute() {
    const questions = await inquirer.prompt([
      { type: "input", name: "title", message: "Enter title name" },
      { type: "input", name: "fromPage", message: "From which page?" },
      { type: "input", name: "toPage", message: "To which page?" },
    ]);

    const newEntry: MemorizationProgress = {
      title: questions.title,
      fromPage: +questions.fromPage,
      toPage: +questions.toPage,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
      }),
    };

    const data = this.context.storage.load();
    data.push(newEntry);
    this.context.storage.save(data);
    console.log("Data saved successfully");
  }
}
