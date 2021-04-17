import Page from 'components/Page';
import React, {useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { postCourse } from '../service/course.service';


const EnterCoursePage = () => {
  const [courseId, setCourseId] = useState("")
  const [courseName, setCourseName] = useState("")
  
  const InitCourseError = {   errorMessage: "",
                                overall: false,
                                required: false,
                                inavlid: false };

  const [courseIdError, setCourseIdError] = useState(InitCourseError);

  const OnSubmit = () => {
    if (courseIdError.overall) {
      return;
    }

    const body = {"course_id":courseId,"course_name":courseName};
    postCourse(body)
    .then(
      res => res.json()
    )
    .then(json => {
      if (json && json.status === "successful" ) {
        //call was sucssess.
        setCourseId("");
        setCourseName("");
        setCourseIdError(InitCourseError);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Page title="Enter Course" breadcrumbs={[{ name: 'Enter Course', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                    <Label for="course_id">Course ID</Label>
                    <Input 
                        type="text"
                        name="course_id"
                        value={courseId}
                        onChange={(event) => setCourseId(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setCourseIdError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                          }
                        }} />
                    {courseIdError.overall && <span>{courseIdError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="course_name">Course Name</Label>
                    <Input 
                        type="text"
                        name="course_name"
                        value={courseName}
                        onChange={(event) => setCourseName(event.target.value)} 
                        onBlur={(event) => {
                            if (event.target.value.trim() === "") {
                              setCourseIdError({errorMessage: "This field is required",
                                              overall: true,
                                              required: true,
                                              inavlid: false})
                            }
                          }} />
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button onClick={OnSubmit}>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default EnterCoursePage;
