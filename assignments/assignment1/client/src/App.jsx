import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    fetch('/resume')  
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching resume data:', error));
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{resumeData.personalInfo.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{resumeData.personalInfo.title}</Card.Subtitle>
              <Card.Text>
                <strong>Email:</strong> {resumeData.personalInfo.email}<br />
                <strong>Phone:</strong> {resumeData.personalInfo.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <ListGroup>
                {resumeData.skills.map((skill, index) => (
                  <ListGroupItem key={index}>{skill}</ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Education</Card.Title>
              {resumeData.education.map((education, index) => (
                <div key={index}>
                  <h5>{education.degree}</h5>
                  <p><strong>{education.institution}</strong>, {education.year}</p>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Experience</Card.Title>
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <h5>{exp.company}</h5>
                  <p><strong>{exp.role}</strong> ({exp.duration})</p>
                  <ul>
                    {exp.responsibilities.map((responsibility, subIndex) => (
                      <li key={subIndex}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
