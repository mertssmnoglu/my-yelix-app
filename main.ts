import { Yelix, requestDataValidationMiddleware } from "jsr:@murat/yelix";
import * as path from "jsr:@std/path@1.0.8";

async function main() {
  // Port is 3030 by default
  const app = new Yelix();

  // Load endpoints from a 'api' folder
  const currentDir = Deno.cwd();
  const API_Folder = path.join(currentDir, 'api');
  await app.loadEndpointsFromFolder(API_Folder);

  app.docsManager.YelixOpenAPI?.customValidationDescription('min', () => {
    return 'hello world!';
  })

  app.setMiddleware('dataValidation', requestDataValidationMiddleware);

  app.initOpenAPI({
    path: "/docs",
    title: "Yelix Testing API",
    description: "This is a testing API for Yelix",
    servers: [
      {
        url: "http://localhost:3030",
        description: "Local Server",
      },
    ],
  });

  app.serve();
}

await main();
