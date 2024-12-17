import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

function ExcelToXmlExplanationPage() {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="12">
          <h1 className="text-center mb-4">Supplier Colour Hierarchy Creation</h1>
          <Row>
            <Col md={6}>
              <Card className="mb-4 p-4 bg-light rounded shadow">
                <Card.Body>
                  <p>This tool converts supplier colour hierarchy files to importable XML. Here's how it works:</p>
                  <ol>
                    <li>The user uploads an Excel file (.xlsx format).</li>
                  </ol>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
            <Card className='p-4 bg-light rounded shadow'>
            <Card.Body>
              <h4>Required Excel Format:</h4>
              <Table responsive striped bordered hover size="sm"className='border-dark'>
                <thead>
                  <tr>
                    <th className="text-truncate">Supplier Name</th>
                    <th className="text-truncate">Colour No</th>
                    <th className="text-truncate">Colour Name</th>
                    <th className="text-truncate">PIM Colour</th>
                    <th className="text-truncate">DIFF ID 1</th>
                    <th className="text-truncate">DIFF ID 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-truncate">Example 1</td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                  </tr>
                  <tr>
                    <td className="text-truncate">Example 2</td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                    <td className="text-truncate"></td>
                  </tr>
                  {/* Add more example rows if needed */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ExcelToXmlExplanationPage