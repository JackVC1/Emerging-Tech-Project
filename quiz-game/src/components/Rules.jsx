import React from 'react';

function Rules() {
  return (
    <section className="rules">
      <h2>How to Play</h2>
      <ol>
        <li>Read the question and choose one of the answer options.</li>
        <li>Once you select an answer you cannot change it for that question.</li>
        <li>You will receive immediate feedback whether your answer was correct.</li>
        <li>Click "Next" to proceed to the next question. At the end you can restart the quiz.</li>
      </ol>

      <h3>Scoring</h3>
      <p>Each correct answer gives you one point. Your current score is shown after each question.</p>

      <h3>Notes</h3>
      <p>This iteration uses a local question set. Later iterations will fetch flags from the REST Countries API and add timers and a scoreboard.</p>
    </section>
  );
}

export default Rules;
