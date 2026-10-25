const express = require('express')
const app = express()
const PORT = 5002

app.use(express.json())

// Student Records
let students = [
  {
    id: 1,
    name: 'Shahbaaz Mansuri',
    email: 'shahbaaz@example.com',
    course: 'MCA'
  },
  {
    id: 2,
    name: 'Qaiyoom Mansuri',
    email: 'qaiyoom@example.com',
    course: 'BCA'
  },
  {
    id: 3,
    name: 'Hashmi Mansuri',
    email: 'hashmi@example.com',
    course: 'BSc IT'
  }
]

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Student Management REST API is running'
  })
})

// Get All Students
app.get('/api/students', (req, res) => {
  res.status(200).json({
    total: students.length,
    records: students
  })
})

// Search Students by Course
app.get('/api/students/course/:course', (req, res) => {
  const result = students.filter(
    student =>
      student.course.toLowerCase() ===
      req.params.course.toLowerCase()
  )

  res.status(200).json({
    total: result.length,
    records: result
  })
})

// Get Student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  )

  if (!student) {
    return res.status(404).json({
      message: 'Student record not found'
    })
  }

  res.status(200).json(student)
})

// Add New Student
app.post('/api/students', (req, res) => {
  const { name, email, course } = req.body

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof course !== 'string' || !course.trim()
  ) {
    return res.status(400).json({
      message: 'Valid name, email and course are required'
    })
  }

  const student = {
    id: students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1,
    name: name.trim(),
    email: email.trim(),
    course: course.trim()
  }

  students.push(student)

  res.status(201).json({
    message: 'Student added successfully',
    data: student
  })
})

// Update Student
app.put('/api/students/:id', (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  )

  if (!student) {
    return res.status(404).json({
      message: 'Student record not found'
    })
  }

  const { name, email, course } = req.body

  if (!name && !email && !course) {
    return res.status(400).json({
      message: 'Provide at least one field to update'
    })
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        message: 'Name must be a non-empty string'
      })
    }
    student.name = name.trim()
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        message: 'Email must be a non-empty string'
      })
    }
    student.email = email.trim()
  }

  if (course !== undefined) {
    if (typeof course !== 'string' || !course.trim()) {
      return res.status(400).json({
        message: 'Course must be a non-empty string'
      })
    }
    student.course = course.trim()
  }

  res.status(200).json({
    message: 'Student updated successfully',
    data: student
  })
})

// Delete Student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(
    s => s.id === Number(req.params.id)
  )

  if (index === -1) {
    return res.status(404).json({
      message: 'Student record not found'
    })
  }

  const deletedStudent = students.splice(index, 1)[0]

  res.status(200).json({
    message: 'Student deleted successfully',
    data: deletedStudent
  })
})

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(
    `Student Management API running at http://localhost:${PORT}`
  )
})
