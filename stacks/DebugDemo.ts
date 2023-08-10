import {StackContext, Api, EventBus, Function} from "sst/constructs";

export function API({ stack }: StackContext) {
  const DebuggedFunction =  new Function(stack, "DebugDemo2", {
    handler: "packages/functions/src/debug_me.debug_target",
    runtime:"python3.9",
    environment:{"PYTHONPATH":"src"}
  })

  const api = new Api(stack, "api", {
    routes: {
      "GET /": DebuggedFunction
    },
  });


  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
