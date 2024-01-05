import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';




export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto', textAlign: 'center' };
  const [name, setName] = useState(' ')
  const [grade, setGrade] = useState(' ')
  const [students, setStudents] = useState([])

  const handleClick = (e) => {
    e.preventDefault()
    const student = { name, grade }
    console.log(student)
    fetch("http://localhost:8080/student/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(student) })
      .then(() => {
        console.log("Student Added")
      })
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
      }
      )
  }, [])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "#36454F" }}>
          <b>Add Student</b>
        </h1>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1 }, textAlign:'center'}}
          noValidate
          autoComplete="off"
        >
          <TextField
  id="standard-basic"
  label="Student Name"
  variant="standard"
  fullWidth
  value={name}
  onChange={(e) => setName(e.target.value)}
  sx={{
    '&:hover:not($focused):before': {
      borderBottomColor: '#36454F',
    },
  }}
/>

<TextField
  id="standard-basic"
  label="Grade"
  variant="standard"
  fullWidth
  value={grade}
  onChange={(e) => setGrade(e.target.value)}
  sx={{
    '&:hover:not($focused):before': {
      borderBottomColor: '#36454F',
    },
  }}
/>
          <Button variant="contained" onClick={handleClick} style={{ backgroundColor: "#36454F", color: "#FFFFFF" }}>
            Submit
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left", color: "#36454F" }} key={student.id}>
            <strong>Name:</strong> {student.name} <strong>Grade:</strong> {student.grade}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

