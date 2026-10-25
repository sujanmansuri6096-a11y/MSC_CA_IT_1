
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const API = "http://localhost:5000/api/students";

  const fetchStudents = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setStudents(data);
    } catch {
      setMessage("Backend connection failed!");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, course }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to add student.");
        return;
      }

      setStudents((previous) => [...previous, data]);
      setName("");
      setEmail("");
      setCourse("");
      setMessage("Student added successfully!");
    } catch {
      setMessage("Backend connection failed!");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Student Records</h1>
        <p>MERN Stack Application</p>
      </header>

      <main>
        <form onSubmit={addStudent} className="student-form">
          <h2>Add New Student</h2>

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <button type="submit">Add Student</button>
          {message && <p>{message}</p>}
        </form>

        <section className="student-list">
          <h2>Student List</h2>

          {students.length === 0 ? (
            <p>No student records found.</p>
          ) : (
            students.map((student) => (
              <div className="student-card" key={student._id}>
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <p>Course: {student.course}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
