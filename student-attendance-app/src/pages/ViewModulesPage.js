import Page from 'components/Page';
import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getModules } from '../service/module.service';

const tableTypes = ['hover'];

const ViewModulesPage = () => {
  const [modules, setModules] = useState([]);

  const fetchModules = async () => {
    try {
        const response = await getModules();
        if (response.status === 200) {
          const result = await response.json();
          // console.log(result)
          setModules(result)
        } else {
          console.log('Error')
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchModules();
    return () => {
      
    }
  }, [])

  return (
    <Page
      title="Modules Overview"
      breadcrumbs={[{ name: 'Modules Overview', active: true }]}
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
                            <th>Module ID</th>
                            <th>Module Name</th>
                            <th>Lecturer ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules && modules.length > 0 && modules.map((module, index) => 
                              (
                                <tr key={module.lecturer_id}>
                                  <td>{index+1}</td>
                                  <td>{module.module_id}</td>
                                  <td>{module.name}</td>
                                  <td>{module.lecturer_id}</td>
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

export default ViewModulesPage;
