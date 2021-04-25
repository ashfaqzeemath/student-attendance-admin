import Page from 'components/Page';
import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getLecturer } from '../service/lecturer.service';

const tableTypes = ['hover'];

const ViewLecturersPage = () => {
  const [lecturers, setLecturers] = useState([]);

  const fetchLecturer = () => {
    getLecturer()
    .then(
      res => res.json()
    )
    .then(json => {
      console.log(JSON.stringify(json, null, 2));
      if (json && json.status === "successful" ) {
        //call was sucssess.
        console.log(json);
        setLecturers(json.results);
        
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchLecturer();
    return () => {
      
    }
  }, [])


  return (
    <Page
      title="Lectures Overview"
      breadcrumbs={[{ name: 'Lectures Overview', active: true }]}
      className="TablePage"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table {...{ [tableType || 'default']: true }}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Lecturer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lecturers && lecturers.length > 0 && lecturers.map((lecturer, index) => 
                              (
                                <tr key={lecturer.lecturer_id}>
                                  <td>{index+1}</td>
                                  <td>{lecturer.lecturer_id}</td>
                                  <td>{lecturer.f_name}</td>
                                  <td>{lecturer.l_name}</td>
                                </tr>
                              )
                            ) }
                          {/* <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr> */}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}
    </Page>
  );
};

export default ViewLecturersPage;
