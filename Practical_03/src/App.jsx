
// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     event: ''
//   })

//   const [message, setMessage] = useState('')

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//     setMessage('')
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!form.name || !form.email || !form.password || !form.event) {
//       setMessage('Please fill in all fields!')
//     } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//       setMessage('Please enter a valid email!')
//     } else if (form.password.length < 6) {
//       setMessage('Password must be at least 6 characters!')
//     } else {
//       setMessage('Registration successful! 🎉')
//     }
//   }

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <h1>🎉 Event Registration</h1>
//         <p>Register now and join the event!</p>

//         <label>Full Name</label>
//         <input name="name" placeholder="Enter your name"
//           value={form.name} onChange={handleChange} />

//         <label>Email Address</label>
//         <input name="email" type="email" placeholder="Enter your email"
//           value={form.email} onChange={handleChange} />

//         <label>Password</label>
//         <input name="password" type="password" placeholder="Minimum 6 characters"
//           value={form.password} onChange={handleChange} />

//         <label>Select Event</label>
//         <select name="event" value={form.event} onChange={handleChange}>
//           <option value="">Choose an event</option>
//           <option>Tech Fest</option>
//           <option>Music Night</option>
//           <option>Art Workshop</option>
//         </select>

//         <button type="submit">Register Now</button>

//         {message && <p className="message">{message}</p>}
//       </form>
//     </div>
//   )
// }

// export default App


import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    event: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (Object.values(form).some(v => !v.trim()))
      return setMessage('Please fill in all fields!')

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setMessage('Please enter a valid email!')

    if (form.password.length < 6)
      return setMessage('Password must be at least 6 characters!')

    if (form.password !== form.confirmPassword)
      return setMessage('Passwords do not match!')

    setMessage('Registration successful! 🎉')
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="logo">E<span>.</span>VENT</div>
        <span>CONNECT · LEARN · CELEBRATE</span>
      </header>

      <main className="layout">
        <section className="intro">
          <span className="badge">✦ YOU'RE INVITED</span>

          <h1>
            Make moments.<br />
            Create <span>memories.</span>
          </h1>

          <p className="desc">
            Join exciting events, meet amazing people
            and make every moment count.
          </p>

          <div className="event-info">
            <div>
              📅 <span><b>Event Date</b><br />Coming Soon</span>
            </div>

            <div>
              📍 <span><b>Location</b><br />College Campus</span>
            </div>
          </div>

          <p className="note">
            Your next great experience starts here.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>EVENT REGISTRATION</span>
            <h2>Save your spot.</h2>
            <p>Fill in your details to register.</p>
          </div>

          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label>Choose Your Event</label>
          <select
            name="event"
            value={form.event}
            onChange={handleChange}
          >
            <option value="">Select an event</option>
            <option value="Tech Fest">Tech Fest</option>
            <option value="Music Night">Music Night</option>
            <option value="Art Workshop">Art Workshop</option>
          </select>

          <button type="submit">
            Complete Registration ↗
          </button>

          {message && (
            <div className="message">{message}</div>
          )}

          <small className="privacy">
            Your information is used for registration only.
          </small>
        </form>
      </main>

      
    </div>
  )
}

export default App
