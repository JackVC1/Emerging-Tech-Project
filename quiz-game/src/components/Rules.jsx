import React from 'react';

function Rules() {
  return (
    <section className="rules">
      <h2>How to Play</h2>
      <ol>
        <li>Each question shows a flag image above four answer options. Your task: identify which country the flag belongs to.</li>
        <li>Click one answer to submit — once selected you cannot change your answer for that question.</li>
        <li>You will receive immediate feedback whether your answer was correct. Correct answers award one point.</li>
        <li>Use the arrow buttons beside the answer area to move between questions: a back arrow on the left and a next arrow (icon-only) on the right.</li>
        <li>A scoreboard and countdown timer are visible in the top-right HUD. The timer starts at 10:00 (ten minutes) and counts down.</li>
        <li>The game ends when the timer reaches 0 or when you have answered all questions (100). At game over your final score is shown and you can restart.</li>
      </ol>

      <h3>Scoring & Progress</h3>
      <p>Each correct answer gives you one point. The current score is shown in the HUD. Progress is shown as Question X of 100 at the top of the game area.</p>

      <h3>Notes & Fallbacks</h3>
      <p>Flags are loaded from the REST Countries API. If the API cannot be reached the app will fall back to the local question set so gameplay continues offline during development.</p>

      <h3>Restarting</h3>
      <p>When the game ends you can restart to play again. Restart resets the timer, score and question position. (Optionally the question set can be regenerated.)</p>
    </section>
  );
}

export default Rules;
