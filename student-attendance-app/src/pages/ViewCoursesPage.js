import Page from 'components/Page';
import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getCourses } from '../service/course.service';

const tableTypes = ['hover'];

const ViewCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
        const response = await getCourses();
        if (response.status === 200) {
          const result = await response.json();
          console.log(result)
          setCourses(result)
        } else {
          console.log('Error')
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchCourses();
    return () => {
      
    }
  }, [])

  return (
    <Page
      title="Courses Overview"
      breadcrumbs={[{ name: 'Courses Overview', active: true }]}
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
                            <th>Course ID</th>
                            <th>Course Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses && courses.length > 0 && courses.map((course, index) => 
                              (
                                <tr key={course.course_id}>
                                  <td>{index+1}</td>
                                  <td>{course.course_id}</td>
                                  <td>{course.course_name}</td>
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

export default ViewCoursesPage;
