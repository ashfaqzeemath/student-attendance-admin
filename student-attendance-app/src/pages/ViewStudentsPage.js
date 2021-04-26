import Page from 'components/Page';
import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getStudents } from '../service/student.service';

const tableTypes = ['hover'];

const ViewStudentsPage = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
        const response = await getStudents();
        if (response.status === 200) {
          const result = await response.json();
          console.log(result)
          setStudents(result)
        } else {
          console.log('Error')
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchStudents();
    return () => {
      
    }
  }, [])

  return (
    <Page
      title="Students Overview"
      breadcrumbs={[{ name: 'Students Overview', active: true }]}
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
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>District</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students && students.length > 0 && students.map((student, index) => 
                                (
                                  <tr key={student.student_id}>
                                    <td>{index+1}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.f_name}</td>
                                    <td>{student.l_name}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.district}</td>
                                  </tr>
                                )
                              ) }
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

export default ViewStudentsPage;
