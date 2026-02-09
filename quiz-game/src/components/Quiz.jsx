import React, { useState, useEffect, useRef } from 'react';
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

  const [answeredCount, setAnsweredCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const timerRef = useRef(null);

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

  // Timer effect
  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  useEffect(() => {
    if (answeredCount >= questions.length) {
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  }, [answeredCount, questions.length]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  if (loading) return <div>Loading questions…</div>;

  const question = questions[currentIndex];

  function selectAnswer(index) {
    if (selected !== null || gameOver) return; // prevent changing answer
    setSelected(index);
    setAnsweredCount(c => c + 1);
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
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  }

  function previousQuestion() {
    if (currentIndex > 0 && !gameOver) {
      setCurrentIndex(i => i - 1);
      setSelected(null);
      setShowFeedback(false);
    }
  }

  function restartGame() {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnsweredCount(0);
    setShowFeedback(false);
    setGameOver(false);
    setTimeLeft(600);
    // optionally regenerate questions (commented out to keep same set)
    // (async () => { const q = await generateFlagQuestions(100); setQuestions(q); })();
  }

  return (
    <section className="quiz">
      {/* HUD: scoreboard and timer */}
      <div className="quiz-hud">
        <div className="scoreboard">Score: <strong>{score}</strong></div>
        <div className="timer">{formatTime(timeLeft)}</div>
      </div>

      <h2 className="quiz-title">Question {currentIndex + 1} of {questions.length}</h2>
      <div className="question-text">{question.prompt}</div>

      {/* show flag when available */}
      {question.flag && (
        <div className="flag-wrap">
          <img src={question.flag} alt={`Flag`} className="flag-image" />
        </div>
      )}

      {gameOver ? (
        <div className="game-over">
          <h3>Game Over</h3>
          <p>Your score: <strong>{score}</strong> / {questions.length}</p>
          <button onClick={restartGame} className="restart-btn">Restart</button>
        </div>
      ) : (
        <>
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
        </>
      )}

    </section>
  );
}

export default Quiz;
