
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/documents";

function App() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(API);
      setDocuments(res.data);
    } catch {
      alert("Cannot connect to server. Check backend.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const uploadDocument = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a document.");
      return;
    }

    const data = new FormData();
    data.append("document", file);

    try {
      setLoading(true);
      await axios.post(`${API}/upload`, data);
      setFile(null);
      e.target.reset();
      fetchDocuments();
      alert("Document uploaded successfully!");
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renameDocument = async (doc) => {
    const name = prompt("Enter new document name:", doc.originalName);
    if (!name || !name.trim()) return;

    try {
      await axios.put(`${API}/${doc._id}`, {
        originalName: name.trim(),
      });
      fetchDocuments();
    } catch {
      alert("Unable to rename document.");
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      fetchDocuments();
    } catch {
      alert("Unable to delete document.");
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.originalName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>DocuVault</h1>
          <p>Your documents, organized in one place.</p>
        </div>
        <span className="secure">Document Manager</span>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Document Management System</h2>
          <p>Upload, search, view, download and manage your files easily.</p>
        </section>

        <section className="upload-card">
          <h2>Upload New Document</h2>
          <form onSubmit={uploadDocument}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        </section>

        <section className="documents-section">
          <div className="section-heading">
            <div>
              <h2>My Documents</h2>
              <p>{documents.length} documents stored</p>
            </div>
            <input
              className="search"
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.originalName}</td>
                    <td>{doc.fileType}</td>
                    <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <a
                        href={`http://localhost:5000/uploads/${encodeURIComponent(doc.fileName)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                      <a
                        href={`http://localhost:5000/uploads/${encodeURIComponent(doc.fileName)}`}
                        download={doc.originalName}
                      >
                        Download
                      </a>
                      <button onClick={() => renameDocument(doc)}>
                        Rename
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteDocument(doc._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredDocuments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      No documents found. Upload your first document!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>DocuVault · Document Management System</footer>
    </div>
  );
}

export default App;
