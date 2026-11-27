# hello-node-chat-agent

A smoke-test fixture for the native Node lane in Future AGI Environments. It is the smallest Node chat agent that the lane can read, bundle and run.

- `POST /chat` with `{"message": "hi"}` returns `{"reply": "..."}`.
- `GET /health` returns `ok`.
- The port comes from `PORT` (default 8080).
- One npm package, no dependencies, Node 22.

```sh
npm ci
npm start
curl -s localhost:8080/chat -d '{"message":"hi"}'
```
