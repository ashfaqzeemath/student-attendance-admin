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

const EnterModulePage = () => {
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
                        name="module_id"/>
                </FormGroup>
                <FormGroup>
                    <Label for="name">Module Name</Label>
                    <Input 
                        type="text"
                        name="name"/>
                </FormGroup>
                <FormGroup>
                <Label for="dept_id">Department</Label>
                    <Input
                    type="text"
                    name="dept_id" />
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

export default EnterModulePage;
