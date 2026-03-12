import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Paul AI Agent Website</h1>
      <p>This website will be automatically updated by an AI agent.</p>

      <div style={{ marginTop: "24px" }}>
        <Link href="/posts">Go to Posts</Link>
      </div>
    </main>
  );
}