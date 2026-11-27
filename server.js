// A tiny chat agent over HTTP. POST /chat {"message": "..."} returns {"reply": "..."}.
const http = require("node:http");

function reply(message) {
  const text = String(message ?? "").trim();
  if (!text) return "Hello! Ask me anything.";
  if (/\b(hi|hello|hey)\b/i.test(text)) return "Hello! How can I help you today?";
  return `You said: ${text}`;
}

http
  .createServer((request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      response.writeHead(200).end("ok");
      return;
    }
    if (request.method !== "POST" || request.url !== "/chat") {
      response.writeHead(404).end();
      return;
    }
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => {
      let message = "";
      try {
        message = JSON.parse(body || "{}").message;
      } catch {
        response.writeHead(400, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: "body must be JSON" }));
        return;
      }
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ reply: reply(message) }));
    });
  })
  .listen(Number(process.env.PORT ?? 8080), "0.0.0.0");
