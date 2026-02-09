// Improved REST Countries integration with explicit fields, fallback endpoint and better error handling
export async function fetchCountries() {
  const endpoints = [
    'https://restcountries.com/v3.1/all?fields=name,flags,cca3',
    'https://restcountries.com/v2/all?fields=name,flag,alpha3Code'
  ];

  async function tryFetch(url) {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      const body = await res.text().catch(() => '<no body>');
      throw new Error(`${res.status} - ${body}`);
    }
    return res.json();
  }

  let lastErr = null;
  for (const url of endpoints) {
    try {
      const data = await tryFetch(url);
      const mapped = data
        .map(c => {
          // v3 shape
          if (c?.name?.common || c?.flags) {
            return {
              name: c?.name?.common,
              code: c?.cca3,
              flag: (c?.flags && (c.flags.svg || c.flags.png)) || null,
            };
          }
          // v2 shape
          if (c?.name || c?.flag) {
            return {
              name: c?.name,
              code: c?.alpha3Code,
              flag: c?.flag || null,
            };
          }
          return null;
        })
        .filter(Boolean)
        .filter(c => c.name && c.flag);

      if (mapped.length === 0) {
        lastErr = `No usable country data returned from ${url}`;
        continue;
      }

      return mapped;
    } catch (e) {
      lastErr = e.message || String(e);
      // try next endpoint
    }
  }

  throw new Error(`REST Countries fetch failed: ${lastErr || 'unknown'}`);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pickRandomItems(array, n, excludeCode) {
  const pool = array.filter(i => i.code !== excludeCode);
  const picked = [];
  while (picked.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export async function generateFlagQuestions(count = 100) {
  let countries = null;
  try {
    const cached = localStorage.getItem('restCountries_cache_v1');
    if (cached) countries = JSON.parse(cached);
  } catch {}

  if (!countries) {
    countries = await fetchCountries();
    try { localStorage.setItem('restCountries_cache_v1', JSON.stringify(countries)); } catch(e) {}
  }

  const questions = [];
  for (let i = 0; i < count; i++) {
    const correct = countries[Math.floor(Math.random() * countries.length)];
    const distractors = pickRandomItems(countries, 3, correct.code);
    const opts = shuffle([correct, ...distractors]).map(o => ({
      text: o.name,
      isCorrect: o.code === correct.code,
    }));
    questions.push({
      id: `${correct.code}-${i}`,
      prompt: 'Which country does this flag belong to?',
      flag: correct.flag,
      options: opts,
      answer: correct.name,
    });
  }

  return questions;
}
