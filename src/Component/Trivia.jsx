import { useState, useEffect } from "react";
import finImagen from "/assets/Maníconborde.png";
import maniImagen from "/assets/Personaje.webp";
import imgCorner from "/assets/Formaazul.png";
import Inicio from "/assets/Manicompletoconbordeblanco.png";
import Logo from "/assets/Logo.png"
import imgCornerWhite from "/assets/Formablanca.png"
const Trivia = () => {
  const questions = [
    {
      question: "¿Cuál es el principal país productor de maní en el mundo?",
      choices: ["China", "Argentina", "Estados Unidos"],
      correctAnswer: 0,
    },
    {
      question: "¿Qué nutriente es especialmente abundante en el maní?",
      choices: ["Proteína", "Carbohidratos", "Calcio"],
      correctAnswer: 0,
    },
    {
      question: "¿En qué región de Argentina es más común el cultivo de maní?",
      choices: ["Patagonia", "Pampa Húmeda", "Córdoba"],
      correctAnswer: 2,
    },
    {
      question: "¿Qué vitamina es abundante en el maní?",
      choices: ["Vitamina C", "Vitamina B3", "Vitamina D"],
      correctAnswer: 1,
    },
    {
      question:
        "¿Qué ciudad de la provincia de Córdoba es conocida como 'La Capital Nacional del Maní'?",
      choices: ["General Deheza", "Hernando", "General Cabrera"],
      correctAnswer: 1,
    },
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isGameStart, setIsGameStart] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isAnswerCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      setIsCorrect(isAnswerCorrect);

      const feedbackMessage = isAnswerCorrect
        ? "¡Correcto! Seguimos en carrera."
        : "Upps, creo que va a tener que conocer más sobre el mundo del maní! Te esperamos en nuestro stand.";

      setFeedback({ message: feedbackMessage });

      const feedbackDuration = isAnswerCorrect ? 3000 : 3000;

      const timer = setTimeout(() => {
        if (isAnswerCorrect) {
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setFeedback(null);
            setIsGameStart(false);
          } else {
            setShowCongratulations(true);
            setShowQuiz(false);
          }
        } else {
          setFeedback(null);
          setShowQuiz(false);
        }
      }, feedbackDuration);

      if (showCongratulations) {
        const autoRestartTimer = setTimeout(() => {
          handleRestartQuiz();
        }, 10000);

        return () => clearTimeout(autoRestartTimer);
      }

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, currentQuestion, showCongratulations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null); // Asegúrate de que el feedback se reinicie
    setShowCongratulations(false);
    setIsGameStart(true);
  };

  const handleRestartQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null); // Asegúrate de que el feedback se reinicie
    setShowCongratulations(false);
    setIsGameStart(true);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  return (
    <div className="trivia-container">
      {!showCongratulations && !showQuiz ? (
        <div className="start-container" onClick={handleStartQuiz}>
          <div className="start-image-wrapper">
            <img
              src={Inicio}
              alt="Desafío para MANÍaticos"
              className="start-image"
            />
          </div>
        </div>
      ) : (
        <>
          {showCongratulations ? (
            <div className="congrats-overlay">
              <div className="congrats-content">
                <img
                  src={finImagen}            
                  alt="Felicitaciones"
                  className="congrats-image"
                />
                <div className="congrats-text">¡Felicitaciones!</div>
                <div className="specialist-text">
                  Sos un especialista en maní como nosotros, y eso tiene un
                  premio
                </div>
                <img src={imgCornerWhite} alt="Imagen Izquierda" className="start-image-left-congrats" />
                <img src={Logo} alt="Imagen Derecha" className="start-image-right-congrats" />
              </div>
            </div>
          ) : (
            <div className={`quiz-wrapper ${showQuiz ? "animate-quiz" : ""}`}>
              <div className="quiz-container">
                <div className="outer-border">
                  <div
                    className={`inner-border ${isExpanded ? "expanded" : ""}`}
                  >
                    <img
                      src={imgCorner}
                      className={`blue-corner ${
                        feedback ? "feedback-visible" : ""
                      } ${isGameStart ? "game-start" : ""}`}
                    />
                    {feedback && (
                      <span
                        className={`feedback-text ${
                          isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        {feedback.message}
                      </span>
                    )}
                    <div className="quiz-content">
                      <div className="question-info">
                        <span>{currentQuestion + 1}.</span>
                      </div>
                      <div className="question-section">
                        <p>{questions[currentQuestion].question}</p>
                      </div>
                      <div className="answers-section">
                        {questions[currentQuestion].choices.map(
                          (choice, index) => (
                            <div
                              key={index}
                              className={`answer-option ${
                                isCorrect === false && selectedAnswer === index
                                  ? "incorrect"
                                  : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                id={`answer-${index}`}
                                checked={selectedAnswer === index}
                                onChange={() => handleAnswerSelect(index)}
                                disabled={isCorrect !== null}
                              />
                              <label htmlFor={`answer-${index}`}>
                                {choice}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <img src={maniImagen} alt="Maní" className="mani-image" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Trivia;
