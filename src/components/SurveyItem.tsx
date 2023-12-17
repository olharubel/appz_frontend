import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const SurveyItem = ({ survey }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(survey.surveyStatus);
    if (survey.surveyStatus  === "UnderPatientReviewSurvey") {
      alert('Checking result...');
    } else if (survey.surveyStatus ===  "UncompletedSurvey" || 
      survey.surveyStatus ===  "OverdueSurvey") {
      console.log('opening survey');
      navigate('/survey1');
    }
  };

  enum SurveyStatus {
    UncompletedSurvey = "Непройдене опитування",
    UnderPatientReviewSurvey = 'Опитування з результатами',
    OverdueSurvey = "Протерміноване опитування",
  }

  return (
    <Container style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
    <Row>
      <Col><h2>{survey.title}</h2></Col>
      <Col className="d-flex justify-content-end">
        <p style={{ display: 'inline-block', marginLeft: '20px' }}>Дедлайн опитування: {survey.dueDate}</p>
    </Col>
    </Row>
    <Row>
      <Col><p style={{ display: 'inline-block' }}>Статус: {SurveyStatus[survey.surveyStatus]}</p></Col>
      <Col className="d-flex justify-content-end">
        {(survey.surveyStatus === "UncompletedSurvey"
        || survey.surveyStatus === "OverdueSurvey") && (
        <Button variant="success" onClick={handleButtonClick}>Пройти опитування</Button>
      )}
      {survey.surveyStatus === "UnderPatientReviewSurvey" && (
        <Button variant="primary" onClick={handleButtonClick}>Переглянути результат</Button>
      )}</Col>
    </Row>
  </Container>
  );
};

export default SurveyItem;
