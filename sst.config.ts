import { SSTConfig } from "sst";
import {API} from "./stacks/DebugDemo";

export default {
  config(_input) {
    return {
      name: "sst-python-intellij-debug",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
