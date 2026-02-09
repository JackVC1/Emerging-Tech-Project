import React, { useState } from 'react';
import questions from '../data/questions';

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentIndex];

  function selectAnswer(index) {
    if (selected !== null) return; // prevent changing answer
    setSelected(index);
    const isCorrect = question.options[index].isCorrect;
    if (isCorrect) setScore(s => s + 1);
    setShowFeedback(true);
  }

  function nextQuestion() {
    setSelected(null);
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // restart for now
      setCurrentIndex(0);
      setScore(0);
    }
  }

  return (
    <section className="quiz">
      <h2 className="quiz-title">Question {currentIndex + 1} of {questions.length}</h2>
      <div className="question-text">{question.prompt}</div>

      <div className="options">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option ${selected === idx ? 'selected' : ''} ${showFeedback && opt.isCorrect ? 'correct' : ''} ${showFeedback && selected === idx && !opt.isCorrect ? 'incorrect' : ''}`}
            onClick={() => selectAnswer(idx)}
            disabled={selected !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="feedback">
          {question.options[selected] && question.options[selected].isCorrect ? (
            <p>Correct! Your score: {score}</p>
          ) : (
            <p>Incorrect. Correct answer: {question.options.find(o => o.isCorrect).text}</p>
          )}
        </div>
      )}

      <div className="quiz-controls">
        <button onClick={nextQuestion} className="next-btn">{currentIndex < questions.length - 1 ? 'Next' : 'Restart'}</button>
      </div>

    </section>
  );
}

export default Quiz;
