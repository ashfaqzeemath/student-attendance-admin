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
import { postStudent, postGenImgUrl } from '../service/student.service';

const EnterStudentPage = () => {
  const [studentId, setStudentId] = useState("")
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [district, setDistrict] = useState("")
  const [sourceImageKey, setSourceImageKey] = useState("")
  const [dob, setdob] = useState("")
  const [courseId, setCourseId] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  const InitStudentError = { errorMessage: "",
                              overall: false,
                              required: false,
                              inavlid: false };

  const [studentError, setStudentError] = useState(InitStudentError);

  const OnBlurImg = () => {
    var fileName = `${studentId}.jpg`;
    const body = {"bucket": "student-faces-source","fileName": fileName};
    postGenImgUrl(body)
    .then(
      res => res.json()
    )
    .then(json => {
      console.log('URL created')
    })
  }
  
  const OnSubmit = () => {
    if (studentError.overall) {
      return;
    }

    const body = {"student_id":studentId,"f_name":fName,"l_name":lName,"district":district,"source_image_key":sourceImageKey,
                  "dob":dob,"gender":gender,"course_id":courseId,"email":email,"phone":phone,"type":"student"};
    postStudent(body)
    .then(
      res => res.json()
    )
    .then(json => {
      
      if (json != null) {
        //call was sucssess.        
        alert("Succesfully Added");
        setStudentId("");
        setFName("");
        setLName("");
        setDistrict("");
        setSourceImageKey("");
        setdob("");
        setCourseId("");
        setEmail("");
        setPhone("");
        setStudentError(InitStudentError);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Page title="Enter Student" breadcrumbs={[{ name: 'Enter Student', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Student Form</CardHeader>
            <CardBody>
              <Form>
              <FormGroup>
                    <Label for="student_id">Student ID</Label>
                    <Input 
                        type="text"
                        name="student_id"
                        value={studentId}
                        onChange={(event) => setStudentId(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setStudentError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                          }
                        }} />
                    {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="f_name">First Name</Label>
                    <Input 
                        type="text"
                        name="f_name"
                        onChange={(event) => setFName(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setStudentError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                          }
                        }} />
                    {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="l_name">Last Name</Label>
                    <Input 
                        type="text"
                        name="l_name"
                        onChange={(event) => setLName(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setStudentError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                          }
                        }} />
                    {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="course_id">Course ID</Label>
                    <Input className="mb-2" type="select" value={courseId} onChange={(event) => setCourseId(event.target.value)}>
                        <option value="">-</option>
                        <option value="IT">IT</option>
                        <option value="IS">IS</option>
                        <option value="IM">IM</option>
                        <option value="MBA">MBA</option>
                    </Input>
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
                <Label for="district">District</Label>
                    <Input
                    type="text"
                    name="district" 
                    onChange={(event) => setDistrict(event.target.value)}
                    onBlur={(event) => {
                      if (event.target.value.trim() === "") {
                        setStudentError({errorMessage: "This field is required",
                                        overall: true,
                                        required: true,
                                        inavlid: false})
                      }
                    }} />
                {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={(event) => {
                      if (event.target.value.trim() === "") {
                        setStudentError({errorMessage: "This field is required",
                                        overall: true,
                                        required: true,
                                        inavlid: false})
                      }
                    }} />
                {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>                
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="07771234567"
                    onChange={(event) => setPhone(event.target.value)}
                    onBlur={(event) => {
                      if (event.target.value.trim() === "") {
                        setStudentError({errorMessage: "This field is required",
                                        overall: true,
                                        required: true,
                                        inavlid: false})
                      }
                    }} />
                {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="dob">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={(event) => setdob(event.target.value)}
                    onBlur={(event) => {
                      if (event.target.value.trim() === "") {
                        setStudentError({errorMessage: "This field is required",
                                        overall: true,
                                        required: true,
                                        inavlid: false})
                      }
                    }} />
                {studentError.overall && <span>{studentError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Student Image</Label>
                  <Input
                    type="file"
                    name="imgFile"
                    onBlur={
                      (event) => {
                        OnBlurImg()
                      }
                    } />
                  <FormText color="muted">
                    Upload a passport size student image.
                  </FormText>
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

export default EnterStudentPage;
