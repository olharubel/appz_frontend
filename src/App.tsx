import React from 'react';
import SurveyList from './components/SurveyList.tsx';
import MainUserPage from './components/MainUserPage.tsx';
import Notification from './components/Notification.tsx';
import Settings from './components/Settings.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Diagnosis from './components/Diagnosis.tsx';
import Login from './components/Login.tsx';
import SurveyFirst from './components/SurveyFirst.tsx';

function App() {
  return (
<Router>
<Routes>
  <Route path="/login" element={<Login />} index/>
  <Route path="/surveys" element={<SurveyList />} />
  <Route path="/" element={<MainUserPage />} />
  <Route path="/notifications" element={<Notification />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/diagnosis" element={<Diagnosis />} />
  <Route path="/survey1" element={<SurveyFirst />} />
</Routes>
</Router>
    
  );
}

export default App;
