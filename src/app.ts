import inquirer from "inquirer";
import { Context } from "./core/context";
import { CommandExecutor } from "./core/command-executor";
import { StorageSingleton } from "./storage/storage.singleton";
import { AddEntryCommand } from "./commands/add-entry.commands";
import { ShowEntriesCommand } from "./commands/show-entries.command";
import { ExitCommand } from "./commands/exit-command";
import { DeleteEntryCommand } from "./commands/delete-entry.command";
import { EditEntryCommand } from "./commands/edit-entry.command";
import { StatsCommand } from "./commands/stats.command";

const context = new Context(StorageSingleton.getInstance());
const executor = new CommandExecutor();

async function bootstrap() {
  const { action } = await inquirer.prompt([
    {
      type: "select",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "➕ New memorization record",
        "📄 Show all records",
        "🗑️ Delete",
        "✏️ Edit",
        "📈 Statistics",
        "❌ Exit",
      ],
    },
  ]);

  switch (action) {
    case "➕ New memorization record":
      await executor.run(new AddEntryCommand(context));
      break;
    case "📄 Show all records":
      await executor.run(new ShowEntriesCommand(context));
      break;
    case "🗑️ Delete":
      await executor.run(new DeleteEntryCommand(context));
      break;
    case "✏️ Edit":
      await executor.run(new EditEntryCommand(context));
      break;
    case "📈 Statistics":
      await executor.run(new StatsCommand(context));
      break;
    case "❌ Exit":
      await executor.run(new ExitCommand());
      break;
  }
  bootstrap();
}

bootstrap();
