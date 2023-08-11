import { Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";

function Course() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading .... try again correctly </div>;
  }

  return (
    <div>
      <CourseCard course={course} />
      <UpdateCard courses={courses} course={course} setCourses={setCourses} />
    </div>
  );
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const course = props.course;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
        <Typography>Update course details</Typography>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Descripition"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image Link"
          variant="outlined"
        />
        <Button
          size={"larger"}
          variant="contained"
          onClick={() => {
            function callback2(data) {
              // alert(" courses updated!");
              let updatedCourses = [];
              for (let i = 0; i < props.courses.length; i++) {
                if (props.courses[i].id == course.id) {
                  updatedCourses.push({
                    id: course.id,
                    title: title,
                    description: description,
                    imageLink: image,
                  });
                } else {
                  updatedCourses.push(props.courses[i]);
                }
              }
              props.setCourses(updatedCourses);
            }
            function callback1(res) {
              res.json().then(callback2);
            }
            fetch(" http://localhost:3000/admin/courses/" + course.id, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                price: "5999",
                imageLink: image,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }).then(callback1);
          }}
        >
          Update Cousre
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
        }}
      >
        <Typography textAlign={"center"} variant="h4">
          {course.title}
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          {course.description}
        </Typography>
        <img src={course.imageLink}></img>
      </Card>
    </div>
  );
}

export default Course;
