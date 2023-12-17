import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header.tsx';
import { Col, Container, Row } from 'react-bootstrap';
import MenuBar from './MenuBar.tsx';

const Settings = () => {
  const [settings, setSettings] = useState({
    doNotSendNotification: false,
    sendByEmail: false,
    sendBySms: false,
    hoursBeforeDeadline: 0,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch('https://your-api-url/settings');
    //   const data = await response.json();
    //   setSettings(data);
    // };
    // fetchData();

    // Simulating initial settings fetch
    setSettings({
      doNotSendNotification: false,
      sendByEmail: true,
      sendBySms: false,
      hoursBeforeDeadline: 1,
    });
  }, []);  

  const handleSave = async () => {
    try {
      // Example: Send data to 'https://your-api-url/settings'
      // const response = await fetch('https://your-api-url/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      // const data = await response.json();

      // Simulating a successful save
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleCheckboxChange = (name) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: !prevSettings[name],
    }));
  };

  const handleScheduleChange = (e) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      hoursBeforeDeadline: parseInt(e.target.value, 10),
    }));
  };

  const handleDoNotAllowChange = () => {
    setIsDisabled((prevIsDisabled) => !prevIsDisabled);
  };

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
      <h1>Налаштування нагадувань</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Частота нагадувань</Form.Label>
          <Form.Check
            type="radio"
            label="За 24 години до закінчення терміну опитування"
            name="schedule"
            onChange={() => handleCheckboxChange('schedule')}
            defaultChecked={settings.hoursBeforeDeadline === 24}
            disabled={isDisabled}
          />
          <Form.Check
            type="radio"
            label="За 12 годин до закінчення терміну опитування"
            name="schedule"
            onChange={() => handleCheckboxChange('schedule')}
            defaultChecked={settings.hoursBeforeDeadline === 12}
            disabled={isDisabled}
          />
          <Form.Check
            type="radio"
            label="За 6 годин до закінчення терміну опитування"
            name="schedule"
            onChange={() => handleCheckboxChange('schedule')}
            defaultChecked={settings.hoursBeforeDeadline === 6}
            disabled={isDisabled}
          />
          <Form.Check
            type="radio"
            label="За 1 годину до закінчення терміну опитування"
            name="schedule"
            onChange={() => handleCheckboxChange('schedule')}
            defaultChecked={settings.hoursBeforeDeadline === 1}
            disabled={isDisabled}
          />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Спосіб отримування нагадувань</Form.Label>
          <Form.Check
            type="checkbox"
            label="На електронну пошту"
            checked={settings.sendByEmail}
            onChange={() => handleCheckboxChange('sendByEmail')}
            disabled={isDisabled}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="На номер телефону"
            checked={settings.sendBySms}
            onChange={() => handleCheckboxChange('sendBySms')}
            disabled={isDisabled}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Вимкнути нагадування"
            checked={isDisabled}
            onChange={handleDoNotAllowChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          Зберегти налаштування
        </Button>
      </Form>
    </div>
    </Col>
      </Row>
      </Container>
    </>
    
  );
};

export default Settings;
