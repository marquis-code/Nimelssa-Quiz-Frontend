import React, { useState, useEffect} from 'react';
import { getQuestions } from '../apis/auth';
import { toast } from 'react-toastify';
import { FaRegClock } from "react-icons/fa";
import { BsLightbulb } from "react-icons/bs";
import { BsLightbulbOff } from "react-icons/bs";
import { FaRing } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { postQuizStatistics } from '../apis/auth';
import { isAuthenticated } from '../helpers/auth';
import { Helmet } from 'react-helmet';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Quiz = () => {
  const navigate = useNavigate();

  const [QuizInfo, setQuizInfo] = useState({
    questionsBank: [],
    currentQuestionIndex: 0,
    selectedOption: '',
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0,
    minutes: '',
    seconds: '',
    hints: 5,
    previousRandomNumbers: [],
    answeredQuestions: [],
    usedFiftyFifty: false,
    fiftyFifty: 2
  });
  let interval = null;

  const [loggedUserMatric, setLoggedUserMatric] = useState('');
  const [loggedUsername, setLoggedUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [miniSeconds, setMiniSeconds] = useState(15);
  // const [showNextButton, setShowNextButton] = useState(true);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  
  // const toggleNextButton = () => {
  //      if(questionsBank[currentQuestionIndex + 1] === undefined) {
  //         setShowNextButton(false)
  //      }
  // }

//   const togglePreviousButton = () => {
//     if(questionsBank[currentQuestionIndex - 1] !== undefined) {
//       setShowPreviousButton(true)
//     }
// }

  const handleModal = () => {
    setShowModal(!showModal);
  }

  const EndGameModal = () => {
    return (
      <>
        <div className='flex justify-center items-center'>
          <div className='w-11/12 lg:w-5/12 mx-auto my-0 shadow-sm rounded-lg bg-green-100 lg:p-4 p-3 absolute -bottom-20 lg:-bottom-5 z-50' onClick={handleModal}>
            <div className='py-6'>
              <h1 className='text-md md:text-xl font-semibold font-serif text-center'>Are you sure you want to exit ?</h1>
              <p className='text-center text-sm md:text-base py-2'>Please note that quiz data would be lost</p>
            </div>
            <div className='flex justify-between items-center py-3 lg:px-3'>
              <button className='px-6 text-sm md:text-base flex justify-center items-center py-2 bg-red-500 text-white w-4/12 rounded-full shadow-sm select-none font-semibold' onClick={() => { navigate('/user') }}>Continue</button>
              <button className='px-6 text-sm md:text-base flex justify-center items-center py-2 bg-green-500 text-white w-4/12 rounded-full shadow-sm select-none font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const { currentQuestionIndex,previousRandomNumbers, correctAnswers, wrongAnswers, score, answeredQuestions, questionsBank, minutes, seconds, hints, fiftyFifty, usedFiftyFifty} = QuizInfo;

  const getLoggedUser = () => {
    const { matric, username } = isAuthenticated();
    setLoggedUserMatric(matric);
    setLoggedUsername(username);
  }

  
  const handleHints = () => {
    if (hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      // console.log(options);
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === questionsBank[currentQuestionIndex].answer.toLowerCase()
        ) {
          indexOfAnswer = index;
          console.log(indexOfAnswer);
        }
      });

      while (true) {
        let randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer && !previousRandomNumbers.includes(randomNumber)) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              setQuizInfo((prevState) => ({
                ...prevState,
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
              }));
            }
          });
          break;
        }
        if (previousRandomNumbers.length >= 3) break;
      }
    } else {
      toast.error('Sorry!!!, You have used up your hints', { theme: 'colored' });
    }
  };

  const checkUsersAuthenticationStatus = () => {
    if (isAuthenticated().role !== 0) {
      navigate('/signin');
      toast('You need to login access quiz', { theme: 'colored' })
    } 

    getLoggedUser();
  }

  const handleFetchingQuestions = () => {
    getQuestions()
      .then((response) => {
        const {data} = response;
        if(data.length === 0) {
          toast.info('No Questions are available', {theme : 'colored'})
          navigate('/user');
        } else {
          setQuizInfo((prevState) => ({...prevState, questionsBank : data}))
          console.log(data)
        }
      }).catch((error) => {
        if(error.request) {
          toast.info('Network Error! Please your internet connection and try again', {theme : 'colored'})
        }
        console.log(error.response.data);
      });
  }

  
  const handleFiftyFifty = () => {
    if (fiftyFifty > 0 && usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === questionsBank[currentQuestionIndex].answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(randomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                newRandomNumber.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      setQuizInfo((prevState) => ({
        ...prevState,
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
    else if (fiftyFifty === 0) {
      toast.error('Sorry!!, You have used up your 50/50s');
    }
  };
  

  const matricConfirmation = () => { 
    confirmAlert({
      title: <h1>Invalid Matric Number&nbsp;<i class="fas fa-exclamation-triangle"></i>
      <span className="sr-only">(current)</span></h1>,
      message: 'A valid matric number is required to confirm your submission',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {endGame()}
        },
        {
          label: 'Cancel',
          onClick: () => {endGame()}
        }
      ]
    });
  };
  
  const endGame = () => {
    setTimeout(() => {
      let userMatric = window.prompt('Please enter your matric number to submit');
      let convertedMatric = Number(userMatric);
      if (convertedMatric === loggedUserMatric) {
        const playerStats = {
          score,
          numberOfQuestions: questionsBank.length,
          numberOfAnsweredQuestions: correctAnswers + wrongAnswers,
          correctAnswers,
          wrongAnswers,
          fiftyFiftyUsed: 2 - fiftyFifty,
          hintsUsed: 5 - hints,
          matric: convertedMatric,
          answeredQuestions,
          minutes,
          seconds,
        };
  
        console.log(playerStats);
  
        postQuizStatistics(playerStats)
          .then(() => {
            toast.success('Quiz data was sucessfully submitted', { theme: 'colored' });
            navigate('/user');
          })
          .catch(() => {
            toast.error('Something went wrong, please check your internet connection and try again.', { theme: 'colored' });
          });
  
      } else {
        toast.error('OOPS!!!, Invalid Matric number', { theme: 'colored' });
        matricConfirmation();
      }
    },1000)
  }

  const startTimer = () => {
    const countDownTime = Date.now() + 900000;
    interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if(questionsBank.length === 0) {
        clearInterval(interval);
      }

      if (distance < 0) {
        clearInterval(interval);
        setQuizInfo((prevState) => ({ ...prevState, minutes: 0, seconds: 0 }));
        toast.info('OOPS!!! Your Time is Up.', { theme: 'colored' })
        endGame();
      } else {
        setQuizInfo((prevState) => ({ ...prevState, minutes, seconds }))
      }
    }, 1000);
  };

  useEffect(() => { 
    let interval = null;

    interval = setInterval(() => {
      setMiniSeconds((miniSeconds) => miniSeconds - 1);
    }, 1000);


    if (miniSeconds === 0) {
      setQuizInfo((prevState) => ({ ...prevState, currentQuestionIndex: currentQuestionIndex + 1, previousRandomNumbers: prevState.previousRandomNumbers = [] }));
      setMiniSeconds(15)
      removeOptionsColor();
      console.log('OOps your time is up for this question');
      clearInterval(interval);
    }

    if (miniSeconds === 0 && questionsBank[currentQuestionIndex + 1] === undefined) {
      clearInterval(interval);
      endGame();
    }

  return () => {
    clearInterval(interval);
  }

   // eslint-disable-next-line
}, [miniSeconds, questionsBank, currentQuestionIndex]);

  useEffect(() => {
  checkUsersAuthenticationStatus();
  // checkQuestionsAvalability();
  handleFetchingQuestions();
  startTimer();
  // eslint-disable-next-line
  },[]);

  const removeOptionsColor = () => {
    let optionField = document.querySelectorAll('.option');  /* This returns a node list, which is not iteratable */
    const options = Array.from(optionField);   /* The Array.from helps to convert the node list into an array so that it can be iteratable */
    options.forEach((option) => {   /* Ruunning forEach on the array to be able to access each content of the array */
      option.style.color = "black";
    })
  };

  // const handleNextButtonClick = () => {
  //   let nextQuestion = questionsBank[currentQuestionIndex + 1]
  //   if (nextQuestion !== undefined) {
  //     setQuizInfo((prevState) => ({ ...prevState, currentQuestionIndex: prevState.currentQuestionIndex + 1, previousRandomNumbers: prevState.previousRandomNumbers = [] }));
  //     showOptions();
  //     removeOptionsColor();
  //     setMiniSeconds(10)
  //     toggleNextButton();
  //   } else {
  //     toast.info('Next Question is not available', { theme: 'colored' })
  //     endGame();
  //   }
  // }

  const handlePreviousButtonClick = () => {
    let previousQuestion = questionsBank[currentQuestionIndex - 1];
    if (previousQuestion !== undefined) {
      setQuizInfo((prevState) => ({ ...prevState, currentQuestionIndex: prevState.currentQuestionIndex - 1 }));
      // togglePreviousButton();
    } else {
      toast.info('Previous Question is not available', { theme: 'colored' })
    }
  }

  const showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    setQuizInfo((prevState) => ({ ...prevState, usedFiftyFifty: false }));
  };

  const handleOptionClick = (event) => {
    const optionClicked = event.target.innerHTML.toLowerCase();
    if (optionClicked === questionsBank[currentQuestionIndex].answer.toLowerCase()) {
      setQuizInfo((prevState) => ({ ...prevState, correctAnswers: prevState.correctAnswers + 1, score: prevState.score + 1, selectedOption: prevState.selectedOption = optionClicked }));
      toast.success('Correct Answer', { theme: 'colored' });
    }

    if (optionClicked !== questionsBank[currentQuestionIndex].answer.toLowerCase()) {
      setQuizInfo((prevState) => ({ ...prevState, wrongAnswers: prevState.wrongAnswers + 1, selectedOption: prevState.selectedOption = optionClicked }));
      toast.error('Wrong Answer', { theme: 'colored' })
    }

    let quizSnapshot = {
      snapshotQuestion: questionsBank[currentQuestionIndex].question.toLowerCase(),
      snapshotAnswer: questionsBank[currentQuestionIndex].answer.toLowerCase(),
      snapshotClickedOption: optionClicked.toLowerCase()
    }

    setQuizInfo((prevState) => ({ ...prevState, answeredQuestions: [...prevState.answeredQuestions, quizSnapshot],  /* currentQuestionIndex: prevState.currentQuestionIndex + 1, */ previousRandomNumbers: prevState.previousRandomNumbers = [] }));

  
    showOptions();
    setShowPreviousButton(true);

    setMiniSeconds(15)

    
  }

    const handleNextButtonClick = () => {
    let nextQuestion = questionsBank[currentQuestionIndex + 1]
    if (nextQuestion !== undefined) {
      setQuizInfo((prevState) => ({ ...prevState, currentQuestionIndex: prevState.currentQuestionIndex + 1, previousRandomNumbers: prevState.previousRandomNumbers = [] }));
      showOptions();
      removeOptionsColor();
      setMiniSeconds(15)
    } else {
      // toast.info('Next Question is not available', { theme: 'colored' })
      endGame();
    }
  }

  return (
    <>
      <Helmet><title>Nimelssa Quiz | Quiz page</title> </Helmet>
      {questionsBank.length > 0 ? (
         <div className='w-11/12 mx-auto my-0 lg:rounded-lg lg:shadow-sm'>
         <div className='flex justify-center font-sans items-center text-lg font-semibold select-none py-2'>Goodlock, {loggedUsername}</div>
         <div className='py-3'>
           <div className='flex justify-between px-3 lg:px-10 py-3 border rounded-lg shadow-sm my-2'>
             {
               fiftyFifty > 0 ? (
                 <p className='select-none cursor-pointer flex items-center text-green-500' onClick={handleFiftyFifty}>
                   <p className='px-1'><FaRing /></p>
                   <p>{fiftyFifty}</p>
                 </p>
               ) :
                 (
                   <p className='select-none cursor-pointer flex items-center text-red-500' onClick={handleFiftyFifty}>
                     <p className='px-1'><FaRing /> </p>
                     <p> {fiftyFifty}</p>
                   </p>
                 )
             }
             {
               hints > 0 ? (
                 <p className='select-none cursor-pointer flex items-center text-green-500 font-semibold mx-2' onClick={handleHints}>
                   <p className='px-1'>{hints}</p>
                   <p><BsLightbulb /></p>
                 </p>
               ) :
                 (
                   <p className='select-none cursor-pointer flex items-center text-red-500 font-semibold' onClick={handleHints}>
                     <p className='px-1'>{hints}</p>
                     <p><BsLightbulbOff /></p>
                   </p>
                 )
             }
           </div>
 
           <div className='flex justify-between items-center px-2 lg:px-10 py-3 rounded-lg shadow-sm border'>
             <div className='flex items-center'>
               <div className={minutes < 2 ? 'text-red-500' : 'text-green-500'}><FaRegClock size='' /></div>
               <div>
                 <div className='flex mr-1'>
                   <p className='select-none lg:text-xl font-semibold px-4'>{minutes}</p> :
                          <p className='select-none lg:text-xl font-semibold px-4'>{seconds}</p>
                 </div>
                 <div className='flex  ml-1 '>
                   <p className='select-none font-semibold text-xs px-1'>Minutes</p>
                   <p className='select-none font-semibold text-xs px-1'>Seconds</p>
                 </div>
               </div>
             </div>
             <div className='lg:flex flex-col items-center p-1'>
               <p className='font-semibold font-sans text-sm lg:text-sm mr-2'>Q.Category:</p>
               <p className='font-semibold text-xs'>{questionsBank[currentQuestionIndex].category.category}</p>
             </div>
           </div>
         </div>

         {showModal ? <EndGameModal /> : ''}
         <div className={(showModal ? 'blur-sm' : '')}>
           <div className='flex justify-center text-center px-3 text-md font-semibold items-center bg-gray-100 md:text-xl py-6 rounded-t-lg select-none font-sans'>{questionsBank[currentQuestionIndex].question} ?</div>
           <div className='rounded-b-lg flex justify-end font-semibold bg-gray-100 text-sm pb-6 lg:text-2xl p-3'>{miniSeconds <= 5 ? `You have ${miniSeconds} sec remaining` : `${miniSeconds} sec`}</div>
           <div className='relative bottom-5 text-white py-2 text-xs  md:text-lg font-semibold select-none md:py-2 md:w-3/12 w-5/12 mx-auto my-0 text-center rounded-full shadow-sm  bg-gradient-to-l from-yellow-600 to-red-600 font-sans'>{`Questions ${currentQuestionIndex + 1} to ${questionsBank.length}`}</div>
           <div className="md:py-10">
             <div className='md:flex justify-between md:py-6'>
               <div className='text-sm option mx-6 rounded-lg shadow-sm my-6 md:my-0 md:w-5/12 select-none cursor-pointer md:ml-6 py-3 bg-blue-200 md:text-lg font-semibold text-center' onClick={handleOptionClick}>{questionsBank[currentQuestionIndex].optionA.toLowerCase()}</div>
               <div className='text-sm option mx-6 rounded-lg shadow-sm md:w-5/12 md:mr-6  py-3 select-none cursor-pointer bg-blue-200 md:text-lg font-semibold text-center' onClick={handleOptionClick}>{questionsBank[currentQuestionIndex].optionB.toLowerCase()}</div>
             </div>
             <div className='md:flex justify-between md:py-6'>
               <div className='text-sm option mx-6 rounded-lg shadow-sm my-6 md:my-0 md:w-5/12 select-none cursor-pointer md:ml-6  py-3 bg-blue-200 md:text-lg font-semibold text-center' onClick={handleOptionClick}>{questionsBank[currentQuestionIndex].optionC.toLowerCase()}</div>
               <div className='text-sm option mx-6 rounded-lg shadow-sm md:w-5/12 md:mr-6  py-3 select-none cursor-pointer bg-blue-200 md:text-lg font-semibold text-center' onClick={handleOptionClick}>{questionsBank[currentQuestionIndex].optionD.toLowerCase()}</div>
             </div>
           </div>
           <div className='flex mb-3 justify-between items-center rounded-lg bg-gray-100 px-3 md:px-10 pb-10 py-6 mt-10 md:mt-0'>
              {showPreviousButton ? 
                <button className='rounded-full text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-2 bg-gradient-to-l from-yellow-600 to-red-600' onClick={handlePreviousButtonClick}>Previous</button>
               : ""}
             <button className='rounded-full text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-2 bg-gradient-to-l from-yellow-600 to-red-600'  onClick={handleModal}>Quit</button>
            {showPreviousButton ? (
              <button className='rounded-full text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-2 bg-gradient-to-l from-yellow-600 to-red-600 text-sm md:text-auto' onClick={handleNextButtonClick}>Next</button>
            ): ""}
           </div>
         </div>
       </div>
      )  : 
      (
        <>
          <div className='flex justify-center items-center mt-48 lg:my-80'>
                   <div className='font-semibold font-sans my-1'>Loading questions....</div>
          </div>
        </>
      )}
    </>
  )
}

export default Quiz;
