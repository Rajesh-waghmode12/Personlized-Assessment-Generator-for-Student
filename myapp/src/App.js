import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import ForgetPassword from './Pages/Forgetpassword/forgetpassword';
import HomePage from './Pages/Homepage/homepage';
//import SubjectsPage from './Pages/SubjectPage/subjectspage';
import ProfileModal from './Pages/ProfileModel/profilemodal';
import SubjectDetailPage from './Pages/SubjectDetailPage/SubjectDetailPage';
//import MemberCard from './Pages/MemberCard/MemberCard';
import TestForm from './Pages/TestForm/TestForm';
import RecentTests from './Pages/RecentTests/RecentTests';
import Quiz from './Pages/Quiz/Quiz';
import TestScoreAndHomework from './Pages/TestScoreAndHomework/TestScoreAndHomework';
import DataContext from './Pages/DataContext';

function App() {
  const [quizData, setQuizData] = useState({});
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      
      <Route path='/profile' element={<ProfileModal/>} />
      
      {/*<Route path="/subject/:subjectId" element={<SubjectDetailPage/>} /> */}
      <Route path='/createTest/:username' element={<TestForm/>} />
      
      <Route path="/quiz/:username/:id" element={<DataContext.Provider value={{ quizData, setQuizData }}><Quiz/></DataContext.Provider>} />
      <Route path='/TestScoreAndHomework' element={<DataContext.Provider value={{quizData, setQuizData}}><TestScoreAndHomework/></DataContext.Provider>} />
    
      <Route path="/subjectpage/:username" element={<SubjectDetailPage/>} />  
      <Route path='/recentTests/:username' element={<RecentTests/>} />
    </Routes>
  </Router>
  );
}

export default App;
