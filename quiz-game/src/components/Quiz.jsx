import React, { useState, useEffect } from 'react';
import localQuestions from '../data/questions';
import { generateFlagQuestions } from '../api/restCountries';

function Quiz() {
  const [questions, setQuestions] = useState(localQuestions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const q = await generateFlagQuestions(100);
        if (mounted) setQuestions(q);
      } catch (err) {
        console.error('REST Countries API failed, using local questions', err);
        if (mounted) {
          setError(err);
          setQuestions(localQuestions);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading questions…</div>;

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

  function previousQuestion() {
    // go back one question if possible
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setSelected(null);
      setShowFeedback(false);
    }
  }

  return (
    <section className="quiz">
      <h2 className="quiz-title">Question {currentIndex + 1} of {questions.length}</h2>
      <div className="question-text">{question.prompt}</div>

      {/* show flag when available */}
      {question.flag && (
        <div className="flag-wrap">
          <img src={question.flag} alt={`Flag`} className="flag-image" />
        </div>
      )}

      {/* Options with back and next buttons in a row */}
      <div className="qa-row">
        <div className="back-col">
          <button
            onClick={previousQuestion}
            className="back-btn"
            aria-label="Previous question"
            disabled={currentIndex === 0}
            type="button"
          />
        </div>

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

        <div className="next-col">
          <button
            onClick={nextQuestion}
            className="next-btn"
            aria-label={currentIndex < questions.length - 1 ? 'Next question' : 'Restart quiz'}
            type="button"
          />
        </div>
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

    </section>
  );
}

export default Quiz;
