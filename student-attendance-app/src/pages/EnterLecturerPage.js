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
import { postLecturer } from '../service/lecturer.service';

const EnterLecturerPage = () => {
  const [lecturerId, setLecturerId] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [gender, setGender] = useState("")

  const InitLecturerError = { errorMessage: "",
                              overall: false,
                              required: false,
                              inavlid: false };

  const [lecturerError, setLecturerError] = useState(InitLecturerError);

  const OnSubmit = () => {
    if (lecturerError.overall) {
      return;
    }

    const body = {"lecturer_id":lecturerId,"f_name":fName,"l_name":lName,"gender":gender,"email":email,"mobile":mobile,"type":"lecturer"};
    postLecturer(body)
    .then(
      res => res.json()
    )
    .then(json => {
      if (json && json.status === "successful" ) {
        //call was sucssess.
        setLecturerId("");
        setEmail("");
        setMobile("");
        setFName("");
        setLName("");
        setLecturerError(InitLecturerError);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Page title="Enter Lecturer" breadcrumbs={[{ name: 'Enter Lecturer', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Lecturer Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                    <Label for="lecturer_id">Lecturer ID</Label>
                    <Input 
                        type="text"
                        name="lecturer_id"
                        value={lecturerId}
                        onChange={(event) => setLecturerId(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setLecturerError({errorMessage: "This field is required",
                                              overall: true,
                                              required: true,
                                              inavlid: false})
                          }
                        }} />
                    {lecturerError.overall && <span>{lecturerError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="f_name">First Name</Label>
                    <Input 
                        type="text"
                        name="f_name"
                        value={fName}
                        onChange={(event) => setFName(event.target.value)}
                        onBlur={
                          (event) => {
                            if (event.target.value.trim() === "") {
                              setLecturerError({errorMessage: "This field is required",
                                                overall: true,
                                                required: true,
                                                inavlid: false})
                            }
                          }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="l_name">Last Name</Label>
                    <Input 
                        type="text"
                        name="l_name"
                        value={lName}
                        onChange={(event) => setLName(event.target.value)}
                        onBlur={
                          (event) => {
                            if (event.target.value.trim() === "") {
                              setLecturerError({errorMessage: "This field is required",
                                                overall: true,
                                                required: true,
                                                inavlid: false})
                            }
                          }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input className="mb-2" type="select" value={gender} onChange={(event) => setGender(event.target.value)}>
                        <option value="">-</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={
                      (event) => {
                        if (event.target.value.trim() === "") {
                          setLecturerError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                        }
                      }
                    } />
                </FormGroup>                
                <FormGroup>
                  <Label for="mobile">Mobile Number</Label>
                  <Input
                    type="phone"
                    name="mobile"
                    id="mobile"
                    placeholder="07771234567"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    onBlur={
                      (event) => {
                        if (event.target.value.trim() === "") {
                          setLecturerError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                        }
                      }
                    } />
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

export default EnterLecturerPage;
