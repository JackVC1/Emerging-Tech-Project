const questions = [
  {
    prompt: 'Which country does this flag belong to? (Placeholder: red circle on white)',
    options: [
      { text: 'Japan', isCorrect: true },
      { text: 'Bangladesh', isCorrect: false },
      { text: 'Greenland', isCorrect: false },
      { text: 'Indonesia', isCorrect: false },
    ],
  },
  {
    prompt: 'Which country has a maple leaf on its flag?',
    options: [
      { text: 'United States', isCorrect: false },
      { text: 'Canada', isCorrect: true },
      { text: 'United Kingdom', isCorrect: false },
      { text: 'Brazil', isCorrect: false },
    ],
  },
  {
    prompt: 'Which country uses a Union Jack in a corner of its flag?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'South Africa', isCorrect: false },
      { text: 'Argentina', isCorrect: false },
    ],
  }
];

export default questions;
