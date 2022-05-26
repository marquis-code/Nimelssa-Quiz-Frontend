import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Quiz from './components/Quiz';
import SpotQuiz from './components/SpotQuiz';
import Home from './components/Home';
import SignIn from './components/SignIn';
import PublishMcq from './components/PublishMcq'; 
import Instructions from './components/Instructions';
import AdminLanding from './components/AdminLanding';
import UsersList from './components/UsersList';
import PublishSpot from './components/PublishSpot';
import QuizChoice from './components/QuizChoice';
import UserLanding from './components/UserLanding';
import CustomNavbar from './components/CustomNavbar';
import ForgotPassword from './components/ForgotPassword';
import EditUser from './components/EditUser';
import QuizStat from './components/QuizStat';
import AdminMcqStat from './components/AdminMcqStat';
import AdminSpotStat from './components/AdminSpotStat';
import SpotQuizStat from './components/SpotQuizStat';
import Category from './components/Category';
import ResetPassword from './components/ResetPassword';
import ResetMessage from './components/ResetMessage';
import RedirectionMessage from './components/RedirectionMessage';
import StatChoice from './components/QuizStatChoice';
import AllMcqQuizes from './components/AllMcqQuizes';
import AllSpotQuizes from './components/AllSpotQuizes';
import EditMcq from './components/EditMcq';
import EditSpot from './components/EditSpot';
import Comments from './components/Comments';
import AllComments from './components/AllComments';
import PublishTestimony from './components/PublishTestimony';
import ApprovedMatric from './components/ApprovedMatric';
import AllApprovedMatrics from './components/AllApprovedMatrics';
import PublishTrueOrFalse from './components/PublishTrueOrFalse';
import TrueOrFalseQuiz from './components/TrueOrFalseDisplay';

const App = () => (
  <Router>
    <CustomNavbar />
     <Routes>
       <Route exact path='/' element={<Home />} />
       <Route exact path='/signin' element={<SignIn/>} />
       <Route exact path='/signup' element={<SignUp />} />
       <Route exact path='/create-mcq' element={<PublishMcq/>} />
       <Route exact path='/create-trueOrFalse' element={<PublishTrueOrFalse/>} />
       <Route exact path='/create-spot' element={<PublishSpot/>} />
       <Route exact path='/quiz-instructions' element={<Instructions />} />
       <Route exact path='/admin' element={<AdminLanding />} />
       <Route exact path='/user' element={<UserLanding />} />
       <Route exact path='/users-list' element={<UsersList />} />
       <Route exact path='/forgot' element={<ForgotPassword />} />
       <Route exact path='/quiz-choice' element={<QuizChoice />} />
       <Route exact path='/play' element={<Quiz />} />
       <Route exact path='/play_spot' element={<SpotQuiz />} />
       <Route exact path='/editUser/:id' element={<EditUser />} /> 
       <Route exact path='/quizStat' element={<QuizStat />} /> 
       <Route exact path='/spotStat' element={<SpotQuizStat />} /> 
       <Route exact path='/allMcq' element={<AdminMcqStat />} /> 
       <Route exact path='/allSpot' element={<AdminSpotStat />} /> 
       <Route exact path='/category' element={<Category />} /> 
       <Route exact path='/reset/:token' element={<ResetPassword />} /> 
       <Route exact path='/resetMessage' element={<ResetMessage />} /> 
       <Route exact path='/redirect' element={<RedirectionMessage />} /> 
       <Route exact path='/statChoice' element={<StatChoice />} /> 
       <Route exact path='/quizChoice' element={<QuizChoice />} /> 
       <Route exact path='/allMcqQuestions' element={<AllMcqQuizes />} /> 
       <Route exact path='/allSpotQuestions' element={<AllSpotQuizes />} />
       <Route exact path='/editMcq/:id' element={<EditMcq />} />  
       <Route exact path='/editSpot/:id' element={<EditSpot />} /> 
       <Route exact path='/comments' element={<Comments />} /> 
       <Route exact path='/allComments' element={<AllComments />} /> 
       <Route exact path='/createTestimony' element={<PublishTestimony />} /> 
       <Route exact path='/approve_matric' element={<ApprovedMatric />} /> 
       <Route exact path='/allMatrics' element={<AllApprovedMatrics />} /> 
       <Route exact path='/play-true-false' element={<TrueOrFalseQuiz />} /> 
     </Routes>
  </Router>
);

export default App;