import express, { Request, Response } from "express";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";

const app = express();

if (import.meta.env.PROD) {
  // Serve client assets in production
  app.use(express.static("dist/client"));
}

app.get("/getTest", (req: Request, res: Response) => {
  res.json({ message: `GET: ${Date.now()}!` });
});

app.post("/postTest", (req: Request, res: Response) => {
  // Handle the POST request
  res.json({ message: `POST: ${Date.now()}!` });
});

// Page routes
app.get("*", async (req, res) => {
  let clientEntryPath: string;
  if (viteDevServer) {
    // In development, we can simply refer to the source file name
    clientEntryPath = "/client/index.tsx";
  } else {
    // In production we'll figure out the path to the client entry file using the manifest
    // @ts-ignore: This only exists after the client build is complete
    const manifest = (await import("./dist/client/manifest.json")).default;
    clientEntryPath = manifest["client/index.tsx"].file;

    // In a real application we would also use the manifest to generate
    // preload links for assets needed for the rendered page
  }

  let html = `<!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>xplr</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="${clientEntryPath}"></script>
    </body>
  </html>`;

  if (viteDevServer) {
    // This will inject the Vite client in development
    html = await viteDevServer.transformIndexHtml(req.url, html);
  }

  res.send(html);
});

if (viteDevServer) {
  httpDevServer!.on("request", app);
} else {
  console.log("Starting production server");
  app.listen(3000);
}
