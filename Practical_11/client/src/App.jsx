
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [page, setPage] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadBlogs = async () => {
    try {
      const response = await fetch(`${API}/api/blogs`);
      const data = await response.json();
      if (response.ok) setBlogs(data);
    } catch {
      setMessage("Cannot connect to server.");
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = page === "register" ? "register" : "login";
      const response = await fetch(`${API}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          page === "register"
            ? { name, email, password }
            : { email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Authentication failed");
        return;
      }

      if (page === "register") {
        setMessage("Registration successful. Please login.");
        setPage("login");
        setPassword("");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setPassword("");
      setMessage("Login successful!");
      setPage("home");
      loadBlogs();
    } catch {
      setMessage("Cannot connect to server.");
    }
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        editingId
          ? `${API}/api/blogs/${editingId}`
          : `${API}/api/blogs`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not save blog");
        return;
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      setPage("home");
      setMessage(data.message || "Blog saved successfully");
      loadBlogs();
    } catch {
      setMessage("Cannot connect to server.");
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setPage("write");
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`${API}/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setMessage(data.message || "Request completed");
      if (response.ok) loadBlogs();
    } catch {
      setMessage("Cannot connect to server.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setPage("login");
    setMessage("Logged out successfully");
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>BlogSpace</h2>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          {token && (
            <button onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
              setPage("write");
            }}>
              Write Blog
            </button>
          )}
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={() => setPage("login")}>Login</button>
          )}
        </nav>
      </header>

      <main className="container">
        {message && <p className="message">{message}</p>}

        {!token && (page === "login" || page === "register") && (
          <section className="auth-card">
            <h1>{page === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p>
              {page === "login"
                ? "Login to manage your blogs."
                : "Register to start writing blogs."}
            </p>

            <form onSubmit={handleAuth}>
              {page === "register" && (
                <input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button className="primary" type="submit">
                {page === "login" ? "Login" : "Register"}
              </button>
            </form>

            <p>
              {page === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                className="link"
                onClick={() => {
                  setMessage("");
                  setPage(page === "login" ? "register" : "login");
                }}
              >
                {page === "login" ? "Register" : "Login"}
              </button>
            </p>
          </section>
        )}

        {token && page === "write" && (
          <section className="editor-card">
            <h1>{editingId ? "Edit Blog" : "Write a New Blog"}</h1>
            <form onSubmit={saveBlog}>
              <input
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Write your blog content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
              />
              <button className="primary" type="submit">
                {editingId ? "Update Blog" : "Publish Blog"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                  setPage("home");
                }}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        {page === "home" && (
          <section>
            <div className="hero">
              <p className="eyebrow">YOUR STORIES, YOUR SPACE</p>
              <h1>Ideas worth sharing.</h1>
              <p>Discover stories and share your thoughts with the world.</p>
              {token && (
                <button
                  className="primary"
                  onClick={() => setPage("write")}
                >
                  Start Writing
                </button>
              )}
            </div>

            <h2 className="section-title">Latest Blogs</h2>

            {blogs.length === 0 ? (
              <p className="empty">No blogs yet. Be the first to write one!</p>
            ) : (
              <div className="blog-grid">
                {blogs.map((blog) => {
                  const isOwner =
                    user &&
                    blog.author &&
                    (blog.author._id === user.id ||
                      blog.author === user.id);

                  const canManage =
                    token && (isOwner || user?.role === "admin");

                  return (
                    <article className="blog-card" key={blog._id}>
                      <span className="blog-label">BLOG STORY</span>
                      <h3>{blog.title}</h3>
                      <p className="blog-content">{blog.content}</p>
                      <p className="author">
                        By {blog.author?.name || "Unknown Author"}
                      </p>
                      {canManage && (
                        <div className="blog-actions">
                          <button onClick={() => editBlog(blog)}>Edit</button>
                          <button
                            className="danger"
                            onClick={() => deleteBlog(blog._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      <footer>© 2026 BlogSpace · Share your ideas with the world.</footer>
    </div>
  );
}

export default App;
