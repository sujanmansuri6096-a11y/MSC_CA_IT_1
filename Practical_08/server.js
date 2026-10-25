
const express = require('express')
const app = express()
const PORT = 5000

// Middleware
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// Student data
const students = [
  { id: 1, name: 'Sujan Mansuri', course: 'MCA' },
  { id: 2, name: 'Ayesha Khan', course: 'BCA' },
  { id: 3, name: 'Saniya Mansuri', course: 'BSc IT' }
]

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Student Records API is running' })
})

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students)
})

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id))

  if (!student) {
    return res.status(404).json({ message: 'Student not found' })
  }

  res.json(student)
})

// Start server
app.listen(PORT, () => {
  console.log(`Student Records API running at http://localhost:${PORT}`)
})
