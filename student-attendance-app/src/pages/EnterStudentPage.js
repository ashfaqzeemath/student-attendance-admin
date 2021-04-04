import Page from 'components/Page';
import React from 'react';
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

const EnterStudentPage = () => {
  return (
    <Page title="Enter Student" breadcrumbs={[{ name: 'Enter Student', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Student Form</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                    <Label for="fname">First Name</Label>
                    <Input 
                        type="text"
                        name="fname"/>
                </FormGroup>
                <FormGroup>
                    <Label for="lname">Last Name</Label>
                    <Input 
                        type="text"
                        name="lname"/>
                </FormGroup>
                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input className="mb-2" type="select">
                        <option>Male</option>
                        <option>Female</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                <Label for="district">District</Label>
                    <Input
                    type="text"
                    name="district" />
                </FormGroup>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                  />
                </FormGroup>                
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="07771234567"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dob">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Student Image</Label>
                  <Input type="file" name="file" />
                  <FormText color="muted">
                    Upload a passport size student image.
                  </FormText>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
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
