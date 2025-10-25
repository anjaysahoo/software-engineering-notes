import {useState} from "react";
import "./App.css";
import questions from "./data/questions.json"
import Question from "./components/Question.jsx";
import Result from "./components/Result.jsx";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    // Keep all of the logic in App.jsx

    const handleNextQuestion = (isCorrect) => {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswers([...userAnswers, isCorrect]);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
    };

    return (
        <div className="App">
            <h1>World Quiz</h1>

            {/* Questions Component */}
            {currentQuestion < questions.length && (
                <Question
                    question={questions[currentQuestion]}
                    onAnswerClick={handleNextQuestion}
                />
            )}

            {/* Result Component */}
            {currentQuestion === questions.length && (
                <Result
                    userAnswers={userAnswers}
                    questions={questions}
                    resetQuiz={resetQuiz}
                />
            )}
        </div>
    );
}

export default App;
