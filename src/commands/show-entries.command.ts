import { Command } from "../core/command";
import { Context } from "../core/context";

export class ShowEntriesCommand implements Command {
  constructor(private context: Context) {}
  async execute() {
    const data = this.context.storage.load();

    if (data.length === 0) {
      console.log("No entries found.");
    }

    console.log("Your memorization progress:");
    data.forEach((entry, index) => {
      console.log(
        `#${index + 1}. ${entry.title} (${entry.fromPage} - ${
          entry.toPage
        }) - ${entry.date}`
      );
    });
  }
}
