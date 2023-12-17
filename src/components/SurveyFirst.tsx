import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.tsx';
import MenuBar from './MenuBar.tsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Survey, SurveyQuestion } from '../models/survey';


const SurveyFirst = () => {
    const [surveyQuestions, setSurveyQuestions] = useState(sampleQuestions);

    const [answers, setAnswers] = useState<Array<number | null>>(Array(surveyQuestions.length).fill(null));
    const [isPageDirty, setIsPageDirty] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const surveyId = location.state && location.state.surveyId;
    const [answ, setAnsw] = useState([
        { surveyQuestionId: 1, answer: 'Response 1' },
        { surveyQuestionId: 2, answer: 'Response 2' },
      ]);

    const handleLeave = () => {
        const leaveConfirmed = window.confirm('Are you sure? Your data will not be saved!');
        if (leaveConfirmed) {
            setIsPageDirty(false);
            navigate('/');
        }
    };

    const handleSave = async () => {
        const areRequiredQuestionsAnswered = answers.every((answer, index) => !surveyQuestions[index].isRequired || answer !== null);
        if (areRequiredQuestionsAnswered) {
            console.log('Answers:', answers);
            console.log('Survey status updated on the backend.');

            setIsPageDirty(false);
            navigate('/surveys');
        } else {
            window.alert("Заповніть всі обов'язкові поля.");
        }
    };

    const handleRadioChange = (index: number, optionIndex: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = optionIndex;
        setAnswers(updatedAnswers);
        setIsPageDirty(true);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          if (isPageDirty) {
            const message = "Ви впевнені, що хочете вийти? Ваші дані не будуть збережені";
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
             <Header isLoggedIn={true} />
            <Container className="mx-0 px-0 h-100">
                <Row>
                    <Col sm={2} className="min-vh-100">
                        <MenuBar />
                    </Col>
                    <Col sm={8}>
                        <div>
                            {surveyQuestions.map((question, index) => (
                                <div key={question.id}>
                                    <h4>{question.text} {question.isRequired && <span style={{ color: 'red' }}>*</span>}
                                    </h4>
                                    <div>
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} style={{ marginBottom: '8px' }}>
                                                <input
                                                    type="radio"
                                                    name={`question_${index}`}
                                                    value={optionIndex}
                                                    checked={answers[index] === optionIndex}
                                                    onChange={() => handleRadioChange(index, optionIndex)}
                                                />
                                                <label style={{ marginLeft: '4px' }}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {fewAnswersQuestions?.map((question, index) => (
                                <div key={question.id}>
                                    <h4>{question.text}</h4>
                                    <div>
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} style={{ marginBottom: '8px' }}>
                                                    <input
                                                        type="checkbox"
                                                        name={`question_${index}_option_${optionIndex}`}
                                                    />
                                                
                                                <label style={{ marginLeft: '4px' }}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {question.isRequired && <span style={{ color: 'red' }}>*</span>}
                                </div>
                            ))}


                            <Button variant="primary" onClick={handleSave}>
                                Зберегти
                            </Button>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
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
                </Row> */}
            </Container>
        </>
    );
};

export default SurveyFirst;

const sampleQuestions: SurveyQuestion[] = [
    {
        id: 1,
        text: 'Протягом якого часу Вас турбує підвищення артеріального тиску?',
        options: ['до 1 року;', 'від 1 до 5 років;', 'понад 5 років;', 'не можу сказати точно.'],
        isRequired: true,
    },
    {
        id: 3,
        text: 'Скільки разів у середньому Ви вимірюєте артеріальний тиск протягом дня?',
        options: ['1 раз;', '1–2 рази;',
            '3 та більше разів;', 'вимірюю при погіршенні самопочуття'],
        isRequired: false,
    },
    {
        id: 4,
        text: 'Як, на Ваш погляд, потрібно приймати препарати для лікування Вашого захворювання?',
        options: ['постійно;', 'тривалий час;',
            'при погіршенні самопочуття;', 'при підвищенні тиску;',
            'курсами;', 'важко відповісти'],
        isRequired: false,
    },
    {
        id: 5,
        text: 'Як часто Ви знаходитеся на обстеженні та лікуванні в кардіологічному або терапевтичному відділеннях з приводу гіпертонічної хвороби?',
        options: ['не лікуюсь у стаціонарі;', 'знаходжусь у відділенні перший раз;',
            'регулярно – 1–2 рази на рік (усього більше 2 разів);', 'рідко, декілька разів за все життя;',
            'в останній час – декілька разів на рік.'],
        isRequired: false,
    },
    {
        id: 6,
        text: 'Як Ви приймаєте препарати для лікування гіпертонічної хвороби?',
        options: ['постійно;', 'тривалий час;',
            'при погіршенні самопочуття;', 'при підвищенні тиску;',
            'курсами;', 'дуже рідко.'],
        isRequired: false,
    },
    {
        id: 7,
        text: 'Чи знаєте Ви свій рівень холестерину?',
        options: ['ні, не знаю;', 'так, знаю, але перевіряю нерегулярно;',
            'так, перевіряю регулярно.'],
        isRequired: false,
    },
    {
        id: 9,
        text: 'Чи дотримуєтеся Ви дієти (обмежуєте кухонну сіль, тваринні жири, вживаєте достатню кількість фруктів та овочів)?',
        options: ['практично не дотримуюсь;', 'так, але часто її порушую;',
            'так, порушую дієту рідко;'],
        isRequired: false,
    },
    {
        id: 10,
        text: 'Який час щодня в середньому Ви приділяєте фізичній активності (ходіння, біг, фізичні вправи)?',
        options: ['менше, ніж 30 хвилин на день;',
            'більше, ніж 30 хвилин, але не щодня (декілька разів на тиждень);',
            'більше, ніж 30 хвилин регулярно;'],
        isRequired: false,
    },
    {
        id: 11,
        text: 'Як часто Ви звертаєтеся до лікаря з приводу гіпертонічної хвороби?',
        options: ['практично не звертаюсь до лікаря;', 'рідше 1 разу на 2 місяці викликаю лікаря або приходжу на прийом;',
            '1–2 рази на місяць викликаю лікаря або приходжу на прийом;', 'доводиться звертатися декілька разів на місяць.'],
        isRequired: false,
    },
    {
        id: 12,
        text: 'Чи задоволені Ви якістю амбулаторної медичної допомоги? ',
        options: ['так, мене влаштовує якість допомоги;', ' не зовсім, є те, що потребує змін;',
            'мене не влаштовує якість допомоги, звертаюсь до лікаря у крайньому разі.'],
        isRequired: false,
    },
    {
        id: 13,
        text: 'Чи доводилося Вам викликати «швидку допомогу» в зв’язку с підвищенням артеріального тиску на протязі останніх 6 місяців?',
        options: ['так, часто;', 'так, декілька разів;',
            'так, один-два рази;', 'ні.'],
        isRequired: false,
    },
];

const fewAnswersQuestions: SurveyQuestion[] = [
    {
        id: 2,
        text: 'Чи впливає підвищення артеріального тиску на Ваше самопочуття?',
        options: ['ні, практично не впливає;', 'так, турбують болі у ділянці серця;',
            'так, порушується ритм серця;', 'так, з’являється хиткість ходи, запаморочення;',
            'так, турбує слабість та втомлюваність;', 'так, турбують головні болі'],
        isRequired: false,
    },
    {
        id: 8,
        text: 'Який із варіантів лікування гіпертонічної хвороби Ви вважаєте найвірнішим?',
        options: ['крапельниці;', 'внутрішньовенне введення;',
            'внутрішньом’язове введення ліків;', 'прийом таблеток;',
            'нетрадиційні методи лікування;', 'застосування рослинних препаратів, біодобавок;',
            'фізіопроцедури, масаж, дієта.'],
        isRequired: false,
    },
];
