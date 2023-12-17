import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';
import MenuBar from './MenuBar.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Survey } from '../models/survey.ts';  
import SurveyItem from './SurveyItem.tsx';

const Diagnosis = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const apiUrl = `https://localhost:7256/Survey/patient/${userId}/completed`;

    axios.get(apiUrl) 
      .then(response => {
        console.log(response.data);
        setSurveys(response.data);
      })
      .catch(error => {
        console.error('Error fetching surveys:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className="mx-0 px-0 h-100">
      <Row>
        <Col sm={2} className='min-vh-100'>
        <MenuBar />
        </Col>
        <Col sm={8}>
        <div>
        <h1>Пройдені опитування</h1>
              {surveys?.map(survey => (
                <SurveyItem key={survey?.id} survey={survey} />
              ))}
        </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Diagnosis;

