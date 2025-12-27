import inquirer from "inquirer";
import { Command } from "../core/command";
import { Context } from "../core/context";

export class EditEntryCommand implements Command {
  constructor(private context: Context) {}

  async execute(): Promise<void> {
    const data = await this.context.storage.load();

    if (data.length === 0) {
      console.log("No entries found.");
      return;
    }

    const { index } = await inquirer.prompt([
      {
        type: "select",
        name: "index",
        message: "Select an entry to edit:",
        choices: data.map((entry, index) => ({
          name: `${entry.title} (${entry.fromPage} - ${entry.toPage}) - ${entry.date}`,
          value: index,
        })),
      },
    ]);

    const entry = data[index];

    if (!entry) {
        console.error("No entry found for the selected index.");
        return;
    }

    const questions = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter title name",
        default: entry.title,
      },
      {
        type: "input",
        name: "fromPage",
        message: "From which page?",
        default: `${entry.fromPage}`,
      },
      {
        type: "input",
        name: "toPage",
        message: "To which page?",
        default: `${entry.toPage}`,
      },
    ]);
    
    data[index] = {
        ...entry,
        title: questions.title,
        fromPage: parseInt(questions.fromPage),
        toPage: parseInt(questions.toPage),
    }

    this.context.storage.save(data)
    console.log('Entry updated successfully.');        
  }
}
