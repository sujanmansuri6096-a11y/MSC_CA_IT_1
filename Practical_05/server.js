
const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Shahbaaz", course: "Bsc CA & IT" }
];

// GET: View all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST: Add a new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});


 // PUT: Update a student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json(student);
});

 // DELETE: Delete a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
