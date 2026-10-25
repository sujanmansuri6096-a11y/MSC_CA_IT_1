// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App




// import { useState } from 'react'
// import './App.css'

// function TaskCard({ task, onDelete }) {
//   return (
//     <div className="task">
//       <span>{task}</span>
//       <button onClick={onDelete}>Delete</button>
//     </div>
//   )
// }

// function App() {
//   const [task, setTask] = useState('')
//   const [tasks, setTasks] = useState([])

//   const addTask = () => {
//     if (task.trim()) {
//       setTasks([...tasks, task])
//       setTask('')
//     }
//   }

//   return (
//     <div className="app">
//       <h1>Daily Task Manager</h1>
//       <p>Manage your daily tasks easily!</p>

//       <input
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//         placeholder="Enter your task"
//       />
//       <button onClick={addTask}>Add Task</button>

//       {tasks.map((item, index) => (
//         <TaskCard
//           key={index}
//           task={item}
//           onDelete={() => setTasks(tasks.filter((_, i) => i !== index))}
//         />
//       ))}
//     </div>
//   )
// }

// export default App


// import { useState } from 'react'
// import './App.css'

// function WorkoutCard({ workout, onChange, onDifficulty }) {
//   return (
//     <div className="workout-card">
//       <div className="workout-icon">{workout.icon}</div>
//       <h3>{workout.name}</h3>
//       <p>{workout.description}</p>

//       <div className="duration">
//         <button onClick={() => onChange(-10)}>−</button>
//         <span>{workout.minutes} min</span>
//         <button onClick={() => onChange(10)}>+</button>
//       </div>

//       <label>Difficulty</label>
//       <select
//         value={workout.difficulty}
//         onChange={(e) => onDifficulty(e.target.value)}
//       >
//         <option>Easy</option>
//         <option>Medium</option>
//         <option>Hard</option>
//       </select>
//     </div>
//   )
// }

// function App() {
//   const [workouts, setWorkouts] = useState([
//     {
//       id: 1,
//       name: 'Cardio',
//       icon: '🏃',
//       description: 'Improve your stamina',
//       minutes: 20,
//       difficulty: 'Medium'
//     },
//     {
//       id: 2,
//       name: 'Yoga',
//       icon: '🧘',
//       description: 'Relax your mind and body',
//       minutes: 15,
//       difficulty: 'Easy'
//     },
//     {
//       id: 3,
//       name: 'Strength Training',
//       icon: '🏋️',
//       description: 'Build strength and fitness',
//       minutes: 30,
//       difficulty: 'Hard'
//     }
//   ])

//   const [saved, setSaved] = useState(false)

//   function updateWorkout(id, change) {
//     setWorkouts(workouts.map((w) =>
//       w.id === id
//         ? { ...w, minutes: Math.max(0, w.minutes + change) }
//         : w
//     ))
//     setSaved(false)
//   }

//   function updateDifficulty(id, difficulty) {
//     setWorkouts(workouts.map((w) =>
//       w.id === id ? { ...w, difficulty } : w
//     ))
//     setSaved(false)
//   }

//   const totalMinutes = workouts.reduce(
//     (total, w) => total + w.minutes, 0
//   )

//   return (
//     <div className="container">
//       <header>
//         <p className="tagline">YOUR DAILY FITNESS ROUTINE</p>
//         <h1>My Workout Planner 💪</h1>
//         <p>Plan your workout. Build a healthier you!</p>
//       </header>

//       <div className="workout-list">
//         {workouts.map((workout) => (
//           <WorkoutCard
//             key={workout.id}
//             workout={workout}
//             onChange={(change) => updateWorkout(workout.id, change)}
//             onDifficulty={(difficulty) =>
//               updateDifficulty(workout.id, difficulty)
//             }
//           />
//         ))}
//       </div>

//       <div className="summary">
//         <div>
//           <p>Total Workout Time</p>
//           <h2>{totalMinutes} minutes</h2>
//         </div>
//         <div>
//           <p>Planned Workouts</p>
//           <h2>{workouts.length} activities</h2>
//         </div>
//       </div>

//       <button className="save-btn" onClick={() => setSaved(true)}>
//         Save My Plan
//       </button>

//       {saved && (
//         <p className="success">✅ Your workout plan is saved!</p>
//       )}
//     </div>
//   )
// }

// export default App


import { useState } from 'react'
import './App.css'

function WorkoutCard({ name, icon, minutes, change }) {
  return (
    <div className="card">
      <h2>{icon} {name}</h2>
      <p>Workout Duration</p>
      <div className="controls">
        <button onClick={() => change(-5)}>−</button>
        <b>{minutes} min</b>
        <button onClick={() => change(5)}>+</button>
      </div>
    </div>
  )
}

function App() {
  const [times, setTimes] = useState([20, 15, 30])
  const [saved, setSaved] = useState(false)
  const names = ['Cardio', 'Yoga', 'Strength Training']
  const icons = ['🏃', '🧘', '🏋️']

  const changeTime = (i, value) => {
    setTimes(times.map((t, index) =>
      i === index ? Math.max(0, t + value) : t
    ))
    setSaved(false)
  }

  return (
    <div className="app">
      <h1>💪 My Workout Planner</h1>
      <p>Plan your workout, stay healthy!</p>

      <div className="cards">
        {names.map((name, i) => (
          <WorkoutCard
            key={name}
            name={name}
            icon={icons[i]}
            minutes={times[i]}
            change={(v) => changeTime(i, v)}
          />
        ))}
      </div>

      <div className="summary">
        <h2>Total: {times.reduce((a, b) => a + b, 0)} minutes</h2>
        <button onClick={() => setSaved(true)}>Save My Plan</button>
        {saved && <p>✅ Plan saved successfully!</p>}
      </div>
    </div>
  )
}

export default App
