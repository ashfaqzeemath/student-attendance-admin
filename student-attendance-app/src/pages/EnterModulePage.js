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
import { postModule } from '../service/module.service';


const EnterModulePage = () => {
  const [moduleId, setModuleId] = useState("")
  const [name, setName] = useState("")
  const [lecturerId, setLecturerId] = useState("")
  const [courseId, setCourseId] = useState("")
  
  const InitModuleIdError = { errorMessage: "",
                              overall: false,
                              required: false,
                              inavlid: false};

  const [moduleIdError, setmoduleIdError] = useState(InitModuleIdError);

  const OnSubmit = () => {
    if (moduleIdError.overall) {
      return;
    }

    const body = {"module_id":moduleId,"name":name,"lecturer_id":lecturerId,"course_id":courseId};
    postModule(body)
    .then(
      res => res.json()
    )
    .then(json => {
      if (json != null) {
        //call was sucssess.
        alert("Succesfully Added");
        setModuleId("");
        setName("");
        setLecturerId("");
        setmoduleIdError(InitModuleIdError);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  //{"module_id":"3","name":"SNA","lecturer_id":"1","course_id":"1"}
  return (
    <Page title="Enter Module" breadcrumbs={[{ name: 'Enter Module', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Module Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                    <Label for="module_id">Module ID</Label>
                    <Input 
                        type="text"
                        name="module_id"
                        value={moduleId}
                        onChange={(event) => setModuleId(event.target.value)}
                        onBlur={(event) => {
                          if (event.target.value.trim() === "") {
                            setmoduleIdError({errorMessage: "This field is required",
                                            overall: true,
                                            required: true,
                                            inavlid: false})
                          }
                        }} />
                    {moduleIdError.overall && <span>{moduleIdError.errorMessage}</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="lecturer_id">Lecturer ID</Label>
                    <Input 
                        type="text"
                        name="lecturer_id"
                        value={lecturerId}
                        onChange={(event) => setLecturerId(event.target.value)} />
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

export default EnterModulePage;
