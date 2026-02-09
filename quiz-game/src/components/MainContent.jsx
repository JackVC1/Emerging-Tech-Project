import React from 'react';
import Quiz from './Quiz';
import Rules from './Rules';

function MainContent({ view }) {
  return (
    <main className="main-content">
      <div className="content-container">
        {view === 'home' && <Quiz />}
        {view === 'rules' && <Rules />}
      </div>
    </main>
  );
}

export default MainContent;
