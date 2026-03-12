const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const filePath = path.join(__dirname, "../data/posts.ts");

function escapeForTS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

async function generatePost() {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You write very short blog updates about AI agents, automation, and technology. Return exactly 2 lines in this format:\nTitle: ...\nSummary: ...",
      },
      {
        role: "user",
        content:
          "Generate one short blog title and one short summary for an AI agent website.",
      },
    ],
  });

  const text = completion.choices[0].message.content || "";

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rawTitle =
    lines.find((line) => line.startsWith("Title:"))?.replace("Title:", "").trim() ||
    "AI Generated Post";

  const rawSummary =
    lines.find((line) => line.startsWith("Summary:"))?.replace("Summary:", "").trim() ||
    "This post was generated automatically by an AI script.";

  const title = escapeForTS(rawTitle);
  const summary = escapeForTS(rawSummary);

  let file = fs.readFileSync(filePath, "utf8");

  const newPost = `  {
    title: "${title}",
    summary: "${summary}"
  },
];`;

  file = file.replace("];", newPost);

  fs.writeFileSync(filePath, file);

  console.log("AI post created");
  console.log("Title:", rawTitle);
  console.log("Summary:", rawSummary);
}

generatePost().catch((err) => {
  console.error("Failed to generate post:");
  console.error(err);
  process.exit(1);
});