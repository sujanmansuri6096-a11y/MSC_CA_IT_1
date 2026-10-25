import './App.css'

function StudentCard({ name, course, city, color, description }) {
  return (
    <article className={`student-card ${color}`}>
      <div className="card-banner"></div>
      <div className="avatar">{name.charAt(0)}</div>
      <div className="card-content">
        <h2>{name}</h2>
        <span className="course-badge">{course}</span>
        <div className="details">
          <p>🎓 <b>Course:</b> {course}</p>
          <p>📍 <b>City:</b> {city}</p>
        </div>
        <p className="description">{description}</p>
        <button className="profile-btn">View Profile →</button>
      </div>
    </article>
  )
}

function App() {
  const students = [
    { name: 'Sujan Mansuri', course: 'M.Sc. IT', city: 'Ahmedabad', color: 'blue', description: 'Passionate about technology and learning new things.' },
    { name: 'Shifa Mansuri', course: 'BCA', city: 'Surat', color: 'pink', description: 'Creative mind with a love for coding and innovation.' },
    { name: 'Nilam Makwana', course: 'MCA', city: 'Vadodara', color: 'green', description: 'Focused on building a future through technology.' }
  ]

  return (
    <main className="app">
      <header className="page-header">
        <p className="cap-icon">🎓</p>
        <h1>Student <span>Profile Cards</span></h1>
        <p>React Functional Components and Reusability</p>
        <div className="title-line"></div>
      </header>
      <section className="student-container">
        {students.map(student => <StudentCard key={student.name} {...student} />)}
      </section>
      <footer className="footer">💜 Built with React | Reusable Components</footer>
    </main>
  )
}

export default App
