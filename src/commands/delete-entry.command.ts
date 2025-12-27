import inquirer from "inquirer";
import { Command } from "../core/command";
import { Context } from "../core/context";

export class DeleteEntryCommand implements Command {
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
        message: "Select an entry to delete:",
        choices: data.map((entry, index) => ({
          name: `${entry.title} (${entry.fromPage} - ${entry.toPage}) - ${entry.date}`,
          value: index,
        })),
      },
    ]);

    data.splice(index, 1);
    this.context.storage.save(data);
    console.log("Entry deleted successfully.");
  }
}
