const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const filePath = path.join(__dirname, "../data/posts.ts");

async function generatePost() {

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You write short blog updates about AI technology."
      },
      {
        role: "user",
        content: "Generate a blog Title and Summary about AI agents."
      }
    ]
  });

  const text = completion.choices[0].message.content;

  const lines = text.split("\n");

  const title = lines[0].replace("Title:", "").trim();
  const summary = lines[1].replace("Summary:", "").trim();

  let file = fs.readFileSync(filePath, "utf8");

  const newPost = `  {
    title: "${title}",
    summary: "${summary}"
  },
];`;

  file = file.replace("];", newPost);

  fs.writeFileSync(filePath, file);

  console.log("AI post created");
}

generatePost();