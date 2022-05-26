import React, { useState, useEffect } from "react";
import { getSpotQuestions } from "../apis/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { BsLightbulb } from "react-icons/bs";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import { BsLightbulbOff } from "react-icons/bs";
import { FaRing } from "react-icons/fa";
import { postSpotQuizStatistics } from "../apis/auth";
import { isAuthenticated } from "../helpers/auth";
import { Helmet } from "react-helmet";

const SpotQuiz = () => {
  const navigate = useNavigate();
  const [QuizInfo, setQuizInfo] = useState({
    Questions: [],
    currentQuestionIndex: 0,
    selectedOption: "",
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0,
    minutes: "",
    seconds: "",
    hints: 5,
    previousRandomNumbers: [],
    answeredQuestions: [],
    usedFiftyFifty: false,
    fiftyFifty: 2,
  });
  const [showNextButton, setShowNextButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const EndGameModal = () => {
    return (
      <>
        <div className="flex justify-center items-center">
          <div
            className="w-11/12 lg:w-5/12 mx-auto my-0 shadow-sm rounded-lg bg-green-100 lg:p-4 p-3 absolute -bottom-20 lg:-bottom-5 z-50"
            onClick={handleModal}
          >
            <div className="py-6">
              <h1 className="text-md md:text-xl font-semibold font-serif text-center">
                Are you sure you want to exit ?
              </h1>
              <p className="text-center text-sm md:text-base py-2">
                Please note that quiz data would be lost
              </p>
            </div>
            <div className="flex justify-between items-center py-3 lg:px-3">
              <button
                className="px-6 text-sm md:text-base flex justify-center items-center py-2 bg-red-500 text-white w-4/12 rounded-full shadow-sm select-none font-semibold"
                onClick={() => {
                  navigate("/user");
                }}
              >
                Continue
              </button>
              <button className="px-6 text-sm md:text-base flex justify-center items-center py-2 bg-green-500 text-white w-4/12 rounded-full shadow-sm select-none font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const [loggedUserMatric, setLoggedUserMatric] = useState("");
  const [loggedUsername, setLoggedUsername] = useState("");

  const {
    Questions,
    answeredQuestions,
    currentQuestionIndex,
    minutes,
    seconds,
    hints,
    previousRandomNumbers,
    fiftyFifty,
    usedFiftyFifty,
    score,
    wrongAnswers,
    correctAnswers,
  } = QuizInfo;

  let interval = null;

  const startTimer = () => {
    const countDownTime = Date.now() + 900000;
    interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (Questions.length === 0) {
        clearInterval(interval);
      }

      if (distance < 0) {
        clearInterval(interval);
        setQuizInfo((prevState) => ({ ...prevState, minutes: 0, seconds: 0 }));
        toast.info("OOPS!!! Your Time is Up.", { theme: "colored" });
        endGame();
      } else {
        setQuizInfo((prevState) => ({ ...prevState, minutes, seconds }));
      }
    }, 1000);
  };

  const showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    setQuizInfo((prevState) => ({ ...prevState, usedFiftyFifty: false }));
  };

  const removeOptionsColor = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.color = "black";
    });
  };

  const handleHints = () => {
    if (hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      console.log(options);
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() ===
          Questions[currentQuestionIndex].answer.toLowerCase()
        ) {
          indexOfAnswer = index;
          console.log(indexOfAnswer);
        }
      });

      while (true) {
        let randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              setQuizInfo((prevState) => ({
                ...prevState,
                hints: prevState.hints - 1,
                previousRandomNumbers:
                  prevState.previousRandomNumbers.concat(randomNumber),
              }));
            }
          });
          break;
        }
        if (previousRandomNumbers.length >= 3) break;
      }
    } else {
      toast.error("Sorry!!!, You have used up your hints", {
        theme: "colored",
      });
    }
  };

  const handleFiftyFifty = () => {
    if (fiftyFifty > 0 && usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() ===
          Questions[currentQuestionIndex].answer.toLowerCase()
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
    } else if (fiftyFifty === 0) {
      toast.error("Sorry!!, You have used up your 50/50s");
    }
  };

  const handleFetchingQuestions = () => {
    getSpotQuestions()
      .then((response) => {
        const { data } = response;
        if (data.length === 0) {
          toast.info("No Questions are available", { theme: "colored" });
          navigate("/user");
        } else {
          setQuizInfo((prevState) => ({ ...prevState, Questions: data }));
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getLoggedUser = () => {
    const { matric, username } = isAuthenticated();
    setLoggedUserMatric(matric);
    setLoggedUsername(username);
  };

  useEffect(() => {
    handleFetchingQuestions();
    getLoggedUser();
    startTimer();
    showOptions();
    console.log("start effect");

    return () => {
      clearInterval(interval);
      console.log("clear effect");
    };
  }, [interval]);

  const handleNextButtonClick = () => {
    if (Questions[currentQuestionIndex + 1] !== undefined) {
      setQuizInfo((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        previousRandomNumbers: (prevState.previousRandomNumbers = []),
      }));
      showOptions();
      removeOptionsColor();
    } else {
      toast.info("Next Question is not available", { theme: "colored" });
      endGame();
    }
  };

  const handlePreviousButtonClick = () => {
    let previousQuestion = Questions[currentQuestionIndex - 1];
    if (previousQuestion !== undefined) {
      setQuizInfo((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex - 1,
      }));
    } else {
      toast.info("Previous Question is not available", { theme: "colored" });
    }
  };

  const handleOptionClick = (event) => {
    const optionClicked = event.target.innerHTML.toLowerCase();
    if (
      optionClicked === Questions[currentQuestionIndex].answer.toLowerCase()
    ) {
      setQuizInfo((prevState) => ({
        ...prevState,
        correctAnswers: prevState.correctAnswers + 1,
        score: prevState.score + 1,
        selectedOption: (prevState.selectedOption = optionClicked),
      }));
      toast.success("Correct Answer", { theme: "colored" });
      event.target.style.color = "green";
    }

    if (
      optionClicked !== Questions[currentQuestionIndex].answer.toLowerCase()
    ) {
      setQuizInfo((prevState) => ({
        ...prevState,
        wrongAnswers: prevState.wrongAnswers + 1,
        selectedOption: (prevState.selectedOption = optionClicked),
      }));
      toast.error("Wrong Answer", { theme: "colored" });
      event.target.style.color = "red";
    }

    let quizSnapshot = {
      snapShotImage: Questions[currentQuestionIndex].fileName,
      snapshotQuestion: Questions[currentQuestionIndex].question.toLowerCase(),
      snapshotAnswer: Questions[currentQuestionIndex].answer.toLowerCase(),
      snapshotClickedOption: optionClicked.toLowerCase(),
    };

    setQuizInfo((prevState) => ({
      ...prevState,
      answeredQuestions: [...prevState.answeredQuestions, quizSnapshot],
      /* currentQuestionIndex: prevState.currentQuestionIndex + 1, */ previousRandomNumbers:
        (prevState.previousRandomNumbers = []),
    }));

    setShowNextButton(true);
    showOptions();
  };

  const endGame = () => {
    let userMatric = window.prompt(
      "Please Enter your Matric Number to Confirm it is you"
    );
    let convertedMatric = Number(userMatric);
    if (convertedMatric === loggedUserMatric) {
      const playerStats = {
        score,
        numberOfQuestions: Questions.length,
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

      postSpotQuizStatistics(playerStats)
        .then(() => {
          toast.success("Quiz data was sucessfully submitted", {
            theme: "colored",
          });
          setTimeout(() => {
            if (correctAnswers >= 5) {
              navigate("/success");
            } else {
              navigate("/failure");
            }
          }, 2000);
        })
        .catch(() => {
          toast.error(
            "Something went wrong, please check your internet connection and try again.",
            { theme: "colored" }
          );
        });
    } else {
      toast.error("OOPS!!!, Invalid Matric number", { theme: "colored" });
    }
  };

  const [showImageModal, setShowImageModal] = useState(false);
  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  return (
    <>
      <Helmet>
        <title>Nimelssa Quiz | SPOT Quiz</title>{" "}
      </Helmet>

      <div className="w-11/12 mx-auto my-0 lg:rounded-lg lg:shadow-sm">
        {Questions && Questions.length > 0 ? (
          <>
            <div className="flex justify-center font-sans mt-3 items-center text-lg font-semibold select-none">
              Good Luck {loggedUsername}
            </div>
            <div className="py-3">
              <div className="flex justify-between lg:px-10 py-3">
                {fiftyFifty > 0 ? (
                  <p
                    className="select-none cursor-pointer flex items-center text-green-500"
                    onClick={handleFiftyFifty}
                  >
                    <p className="px-1">
                      <FaRing />
                    </p>
                    <p>{fiftyFifty}</p>
                  </p>
                ) : (
                  <p
                    className="select-none cursor-pointer flex items-center text-red-500"
                    onClick={handleFiftyFifty}
                  >
                    <p className="px-1">
                      <FaRing />{" "}
                    </p>
                    <p> {fiftyFifty}</p>
                  </p>
                )}
                {hints > 0 ? (
                  <p
                    className="select-none cursor-pointer flex items-center text-green-500 font-semibold mx-2"
                    onClick={handleHints}
                  >
                    <p className="px-1">{hints}</p>
                    <p>
                      <BsLightbulb />
                    </p>
                  </p>
                ) : (
                  <p
                    className="select-none cursor-pointer flex items-center text-red-500 font-semibold"
                    onClick={handleHints}
                  >
                    <p className="px-1">{hints}</p>
                    <p>
                      <BsLightbulbOff />
                    </p>
                  </p>
                )}
              </div>

              <div className="px-10 py-3 flex items-center justify-center">
                <div
                  className={minutes < 2 ? "text-red-500" : "text-green-500"}
                >
                  <FaRegClock size="" />
                </div>
                <div>
                  <div className="flex mr-1">
                    <p className="select-none text-xl font-semibold px-4">
                      {minutes}
                    </p>{" "}
                    :
                    <p className="select-none text-xl font-semibold px-4">
                      {seconds}
                    </p>
                  </div>
                  <div className="flex  ml-1 ">
                    <p className="select-none text-xs px-1">Minutes</p>
                    <p className="select-none text-xs px-1">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
            {showModal ? <EndGameModal /> : ""}
            <div>
              <div className="flex justify-center items-center"><h2 className="font-semibold">{Questions[currentQuestionIndex].question} ?</h2></div>
              <div className="my-3 flex justify-center items-center">
                <img
                  src={Questions[currentQuestionIndex].imageUrl}
                  alt=""
                  className="h-44 w-60 rounded border"
                />
              </div>
             
              <div className="relative bottom-1 text-white mt-5 py-2 text-xs  md:text-lg font-semibold select-none md:py-2 md:w-3/12 w-5/12 mx-auto my-0 text-center rounded-md lg:rounded-full shadow-sm  bg-gradient-to-l from-yellow-600 to-red-600 ">{`Questions ${
                currentQuestionIndex + 1
              } to ${Questions.length}`}</div>
              <div className="md:py-10">
                <div className="md:flex justify-between md:py-6">
                  <div
                    className="text-sm option lg:mx-6 mx-3 rounded-md shadow-sm my-6 md:my-0 md:w-5/12 select-none cursor-pointer md:ml-6 py-3 bg-blue-200 md:text-lg font-semibold text-center"
                    onClick={handleOptionClick}
                  >
                    {Questions[currentQuestionIndex].optionA.toLowerCase()}
                  </div>
                  <div
                    className="text-sm option lg:mx-6 mx-3 rounded-md shadow-sm md:w-5/12 md:mr-6  py-3 select-none cursor-pointer bg-blue-200 md:text-lg font-semibold text-center"
                    onClick={handleOptionClick}
                  >
                    {Questions[currentQuestionIndex].optionB.toLowerCase()}
                  </div>
                </div>
                <div className="md:flex justify-between md:py-6">
                  <div
                    className="text-sm option lg:mx-6 mx-3 rounded-md shadow-sm my-6 md:my-0 md:w-5/12 select-none cursor-pointer md:ml-6  py-3 bg-blue-200 md:text-lg font-semibold text-center"
                    onClick={handleOptionClick}
                  >
                    {Questions[currentQuestionIndex].optionC.toLowerCase()}
                  </div>
                  <div
                    className="text-sm option lg:mx-6 mx-3 rounded-md shadow-sm md:w-5/12 md:mr-6  py-3 select-none cursor-pointer bg-blue-200 md:text-lg font-semibold text-center"
                    onClick={handleOptionClick}
                  >
                    {Questions[currentQuestionIndex].optionD.toLowerCase()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-b-lg bg-gray-100 px-3 md:px-10 pb-10 py-6 mt-10 md:mt-0">
                <button
                  className="rounded-full flex justify-center items-center text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-1 bg-gradient-to-l from-yellow-600 to-red-600"
                  onClick={handlePreviousButtonClick}
                >
                <HiArrowSmLeft size={20} />
                </button>
                <button
                  className="rounded-md flex justify-center items-center text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-1 bg-gradient-to-l from-yellow-600 to-red-600"
                  onClick={handleModal}
                >
                  <GiCancel size={20} />
                </button>
                {showNextButton ? (
                  <button
                    className="rounded-md flex justify-center items-center text-white font-semibold text-center select-none text-xs w-3/12 md:text-base md:5/12 md:w-2/12 py-2 bg-gradient-to-l from-yellow-600 to-red-600 text-sm md:text-auto"
                    onClick={handleNextButtonClick}
                  >
                      <HiArrowSmRight size={20} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center mt-48 lg:my-80">
              <div className="font-semibold font-sans my-1">
                Loading questions....
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpotQuiz;
