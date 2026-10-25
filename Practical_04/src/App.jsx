
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Learn<span>Hub.</span></h2>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <section className="hero">
      <div>
        <p className="tag">YOUR LEARNING JOURNEY STARTS HERE</p>
        <h1>Learn New Skills.<br /><span>Build Your Future.</span></h1>
        <p>Explore courses, manage your study schedule and
          take the next step towards your goals.</p>
        <NavLink to="/courses" className="btn">Explore Courses →</NavLink>
      </div>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
        alt="Students learning together"
      />
    </section>
  )
}

function Courses() {
  const courses = [
    ['💻', 'Web Development', 'Learn HTML, CSS, JavaScript and React.'],
    ['📊', 'Data Science', 'Explore data analysis and visualization.'],
    ['🎨', 'UI/UX Design', 'Create beautiful and user-friendly designs.']
  ]

  return (
    <section className="content">
      <p className="tag">LEARN SOMETHING NEW</p>
      <h1>Explore Our Courses</h1>
      <p className="subtitle">Choose a course and start building your skills.</p>
      <div className="cards">
        {courses.map((course) => (
          <div className="card" key={course[1]}>
            <div className="course-icon">{course[0]}</div>
            <h3>{course[1]}</h3>
            <p>{course[2]}</p>
            <NavLink to="/schedule" className="card-link">View Schedule →</NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

function Schedule() {
  const lessons = [
    ['09:00 AM', 'HTML & CSS', 'Monday'],
    ['11:00 AM', 'JavaScript Basics', 'Wednesday'],
    ['02:00 PM', 'React Fundamentals', 'Friday']
  ]

  return (
    <section className="content">
      <p className="tag">PLAN YOUR LEARNING</p>
      <h1>Weekly Study Schedule</h1>
      <div className="schedule">
        {lessons.map((lesson) => (
          <div className="lesson" key={lesson[1]}>
            <strong>{lesson[0]}</strong>
            <div><h3>{lesson[1]}</h3><p>{lesson[2]}</p></div>
            <span>● Scheduled</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="content about">
      <p className="tag">ABOUT LEARNHUB</p>
      <h1>Learning Made Simple.</h1>
      <p>LearnHub is a student learning portal designed to help
        learners explore courses, organize study schedules and
        develop useful skills for their future.</p>
      <div className="about-stats">
        <div><h2>10+</h2><p>Learning Topics</p></div>
        <div><h2>100%</h2><p>Growth Mindset</p></div>
        <div><h2>24/7</h2><p>Learn Anytime</p></div>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer>© 2026 LearnHub. Learn Today, Lead Tomorrow.</footer>
    </BrowserRouter>
  )
}

export default App
