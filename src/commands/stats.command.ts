import { Command } from "../core/command";
import { Context } from "../core/context";

export class StatsCommand implements Command {
    constructor(private context: Context) {}

    async execute(): Promise<void> {
        const data = await this.context.storage.load()

        if (data.length === 0) {
            console.log('No entries found.');
            return
        }

        const summary = new Map<string, number>()

        for(const entry of data) {
            const pageCount = entry.toPage - entry.fromPage + 1
            if (summary.has(entry.title)) {
                summary.set(entry.title, summary.get(entry.title)! + pageCount)
            } else {
                summary.set(entry.title, pageCount)
            }
        }

        console.log('Summary of memoriztion progress:')
        for (const [title, count] of summary.entries()) {
            console.log(`${title}: ${count} Pages`);
            
        }
    }
}