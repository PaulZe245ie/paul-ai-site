import { posts } from "@/data/posts";

export default function PostsPage() {

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Posts</h1>
      <p>Updates from my AI agent website.</p>

      <div style={{ marginTop: "24px" }}>
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #333",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}