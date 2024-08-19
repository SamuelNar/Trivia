import { useState, useEffect } from "react";
import finImagen from "./assets/Fin.jpg";
import inicioImagen from "./assets/Inicio.jpg";
import maniImagen from "./assets/Personaje.png";
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

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isAnswerCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      setIsCorrect(isAnswerCorrect);

      const feedbackMessage = isAnswerCorrect
        ? "¡Correcto! Seguimos en carrera."
        : "Upps, creo que va a tener que conocer más sobre el mundo del maní! Te esperamos en nuestro staff.";
      const feedbackColor = isAnswerCorrect ? "#00FF00" : "#FF0000";

      setFeedback({ message: feedbackMessage, color: feedbackColor });

      const feedbackDuration = isAnswerCorrect ? 3000 : 3000; // Ajusta el tiempo según sea necesario

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
          setShowQuiz(false); // Volver a la pantalla de inicio
        }
      }, feedbackDuration);

      if (showCongratulations) {
        // Reiniciar automáticamente después de 10 segundos
        const autoRestartTimer = setTimeout(() => {
          handleRestartQuiz();
        }, 10000);
  
        return () => clearTimeout(autoRestartTimer);
      }

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, currentQuestion, showCongratulations]);

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
          <img
            src={inicioImagen}
            alt="Desafío para MANÍaticos"
            className="start-image"
          />
          <p className="start-text">
            Desafío para <br />
            MANÍaticos
          </p>
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
              </div>              
            </div>
            
          ) : (
            <div className={`quiz-wrapper ${showQuiz ? "animate-quiz" : ""}`}>
              <div className="quiz-container">
                <div className="border-top"></div>
                <div className="border-right"></div>
                <div className="border-bottom"></div>
                <div className="border-left"></div>
                <div
                  className={`blue-corner ${
                    feedback ? "feedback-visible" : ""
                  } ${isGameStart ? "game-start" : ""}`}
                  style={{ backgroundColor: feedback?.color }}
                >
                  {feedback && (
                    <span
                      className={`feedback-text ${
                        isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      {feedback.message}
                    </span>
                  )}
                </div>
                <div className="fill"></div>
                <div className="quiz-content">
                  <div className="question-info">
                    <span>
                      Pregunta {currentQuestion + 1} de {questions.length}
                    </span>
                  </div>
                  <div className="question-section">
                    <h2>{questions[currentQuestion].question}</h2>
                  </div>
                  <div className="answers-section">
                    {questions[currentQuestion].choices.map((choice, index) => (
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
                        <label htmlFor={`answer-${index}`}>{choice}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <img
                src={maniImagen}
                alt="Maní"
                className="mani-image"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Trivia;
