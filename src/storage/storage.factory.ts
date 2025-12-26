import { JSONStorage } from "./json.storage";
import { StorageStrategy } from "./storage.strategy";

export class StrorageFactory {
  static create(type: "json"): StorageStrategy {
    switch (type) {
      case "json":
      default:
        return new JSONStorage();
    }
  }
}
