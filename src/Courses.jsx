import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

function Courses() {
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

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course(props) {
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h4">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="h6">
        {props.course.description}
      </Typography>
      <img src={props.course.imageLink}></img>
    </Card>
  );
}

export default Courses;
