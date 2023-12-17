import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import MenuBar from './MenuBar.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Survey, SurveyQuestion } from '../models/survey';
 

const SurveyFirst = () => {
    const sampleQuestions: SurveyQuestion[] = [
        {
          id: 1,
          text: 'Протягом якого часу Вас турбує підвищення артеріального тиску?',
          options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
          isRequired: true,
        },
        {
          id: 2,
          text: 'Would you recommend our product to others?',
          options: ['Definitely Yes', 'Probably Yes', 'Not Sure', 'Probably No', 'Definitely No'],
          isRequired: false,
        },
        // Add more questions as needed
      ];
      
      // Assuming this is a part of your component
      const [surveyQuestions, setSurveyQuestions] = useState(sampleQuestions);
      
    const [answers, setAnswers] = useState<Array<number | null>>(Array(surveyQuestions.length).fill(null));
    const [isPageDirty, setIsPageDirty] = useState(false);
    const navigate = useNavigate();
  
    const handleLeave = () => {
      const leaveConfirmed = window.confirm('Are you sure? Your data will not be saved!');
      if (leaveConfirmed) {
        setIsPageDirty(false);
        navigate('/', { state: { userId: 1 } })
      }
    };
  
    const handleSave = async () => {
      const areRequiredQuestionsAnswered = answers.every((answer, index) => !surveyQuestions[index].isRequired || answer !== null);
  
      if (areRequiredQuestionsAnswered) {
        console.log('Answers:', answers);
        console.log('Survey status updated on the backend.');
        setIsPageDirty(false);
      } else {
        window.alert('Please answer all required questions before saving.');
      }
    };
  
    const handleRadioChange = (index: number, optionIndex: number) => {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = optionIndex;
      setAnswers(updatedAnswers);
      setIsPageDirty(true);
    };
  
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (isPageDirty) {
          const message = 'You have unsaved changes. Are you sure you want to leave?';
          event.returnValue = message;
          return message;
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [isPageDirty]);
  
    return (
      <>
        <Header />
        <Container className="mx-0 px-0 h-100">
          <Row>
            <Col sm={2} className="min-vh-100">
              <MenuBar />
            </Col>
            <Col sm={8}>
              <div>
                {/* <h1>{survey.title}</h1>
                <p>Survey Status: {survey.surveyStatus}</p>
                <p>Due Date: {survey.dueDate?.toLocaleString()}</p> */}
  
                {surveyQuestions.map((question, index) => (
                  <div key={question.id}>
                    <p>{question.text}</p>
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex}>
                        <input
                          type="radio"
                          name={`question_${index}`}
                          value={optionIndex}
                          checked={answers[index] === optionIndex}
                          onChange={() => handleRadioChange(index, optionIndex)}
                        />
                        {option}
                      </label>
                    ))}
                    {question.isRequired && <span style={{ color: 'red' }}>*</span>}
                  </div>
                ))}
  
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              {isPageDirty && (
                <div>
                  <p>You have unsaved changes. Are you sure you want to leave?</p>
                  <Button variant="danger" onClick={handleLeave}>
                    Leave
                  </Button>
                  <Button variant="secondary" onClick={() => setIsPageDirty(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default SurveyFirst;
  

// const SurveyFirst: React.FC<SurveyFirstProps> = ({ survey }) => {
//   const [answers, setAnswers] = useState<Array<number | null>>(Array(survey.surveyQuestions.length).fill(null));
//   const [isPageDirty, setIsPageDirty] = useState(false);
//   const navigate = useNavigate();

//   const handleLeave = () => {
//     const leaveConfirmed = window.confirm('Are you sure? Your data will not be saved!');
//     if (leaveConfirmed) {
//       setIsPageDirty(false);
//       navigate('/');
//     }
//   };

//   const handleSave = async () => {
//     const areRequiredQuestionsAnswered = answers.every((answer, index) => !survey.surveyQuestions[index].isRequired || answer !== null);

//     if (areRequiredQuestionsAnswered) {
//       console.log('Answers:', answers);
//       console.log('Survey status updated on the backend.');
//       setIsPageDirty(false);
//     } else {
//       window.alert('Please answer all required questions before saving.');
//     }
//   };

//   const handleRadioChange = (index: number, optionIndex: number) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = optionIndex;
//     setAnswers(updatedAnswers);
//     setIsPageDirty(true);
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (isPageDirty) {
//         const message = 'You have unsaved changes. Are you sure you want to leave?';
//         event.returnValue = message;
//         return message;
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [isPageDirty]);

//   return (
//     <>
//       <Header />
//       <Container className="mx-0 px-0 h-100">
//         <Row>
//           <Col sm={2} className="min-vh-100">
//             <MenuBar />
//           </Col>
//           <Col sm={8}>
//             <div>
//               <h1>{survey.title}</h1>
//               <p>Survey Status: {survey.surveyStatus}</p>
//               <p>Due Date: {survey.dueDate?.toLocaleString()}</p>

//               {survey.surveyQuestions.map((question, index) => (
//                 <div key={question.id}>
//                   <p>{question.text}</p>
//                   {question.options.map((option, optionIndex) => (
//                     <label key={optionIndex}>
//                       <input
//                         type="radio"
//                         name={`question_${index}`}
//                         value={optionIndex}
//                         checked={answers[index] === optionIndex}
//                         onChange={() => handleRadioChange(index, optionIndex)}
//                       />
//                       {option}
//                     </label>
//                   ))}
//                   {question.isRequired && <span style={{ color: 'red' }}>*</span>}
//                 </div>
//               ))}

//               <Button variant="primary" onClick={handleSave}>
//                 Save
//               </Button>
//             </div>
//           </Col>
//         </Row>
//         <Row>
//           <Col sm={2}></Col>
//           <Col sm={8}>
//             {isPageDirty && (
//               <div>
//                 <p>You have unsaved changes. Are you sure you want to leave?</p>
//                 <Button variant="danger" onClick={handleLeave}>
//                   Leave
//                 </Button>
//                 <Button variant="secondary" onClick={() => setIsPageDirty(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SurveyFirst;
