// ═══════════════════════════════════════════════════════════
// core.js — Common functions for English Mastery
// ═══════════════════════════════════════════════════════════

// ═══ STATE ═══
var state = {
  currentCard: null,
  currentCardIdx: 0,
  currentVerbLetter: 'all',
  currentBeVerbIdx: 0,
  currentModernVerbIdx: 0,
  gameQuestions: [],
  gameIdx: 0,
  gameCorrect: 0,
  gameWrong: 0,
  gameType: 'mcq',          // 'mcq' or 'puzzle'
  gameReturnFn: null,
  backStack: [],            // for 1-step back
  puzzle: null
};

// ═══════════════════════════════════════════════════════════
// COLLECT ALL CARDS from aggregators
// ═══════════════════════════════════════════════════════════
function getAllCards() {
  var cards = [];
  // Card 1, 2, 3 (from card1-3-aggregator.js)
  if (typeof CARDS_1_2_3 !== 'undefined' && Array.isArray(CARDS_1_2_3)) {
    cards = cards.concat(CARDS_1_2_3);
  }
  // Card 4 (Be Verbs — from card4-aggregator.js)
  if (typeof CARD4_BEVERBS !== 'undefined') {
    cards.push(CARD4_BEVERBS);
  }
  // Card 5 (Modern Verbs — from card5-aggregator.js)
  if (typeof CARD5_MODERNVERBS !== 'undefined') {
    cards.push(CARD5_MODERNVERBS);
  }
  // Future modules (Module 2, 3, etc.)
  if (typeof CARDS_MODULE2 !== 'undefined' && Array.isArray(CARDS_MODULE2)) {
    cards = cards.concat(CARDS_MODULE2);
  }
  if (typeof CARDS_MODULE3 !== 'undefined' && Array.isArray(CARDS_MODULE3)) {
    cards = cards.concat(CARDS_MODULE3);
  }
  if (typeof CARDS_MODULE4 !== 'undefined' && Array.isArray(CARDS_MODULE4)) {
    cards = cards.concat(CARDS_MODULE4);
  }
  if (typeof CARDS_MODULE5 !== 'undefined' && Array.isArray(CARDS_MODULE5)) {
    cards = cards.concat(CARDS_MODULE5);
  }
  return cards;
}

// ═══════════════════════════════════════════════════════════
// BACK STACK — 1 step back
// ═══════════════════════════════════════════════════════════
function pushBack(fn) {
  state.backStack.push(fn);
}

function goBack() {
  if (state.backStack.length > 1) {
    state.backStack.pop();                 // remove current
    var prevFn = state.backStack.pop();    // get previous
    if (prevFn) prevFn();
  } else {
    state.backStack = [];
    renderHome();
  }
}

function goHomeDirect() {
  state.backStack = [];
  renderHome();
}

// ═══════════════════════════════════════════════════════════
// PAGE SWITCHING
// ═══════════════════════════════════════════════════════════
function showPage(pageId) {
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(p) { p.classList.remove('active'); });
  var target = document.getElementById(pageId);
  if (target) target.classList.add('active');
  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════
function renderHome() {
  state.backStack = [];
  var cards = getAllCards();
  var grid = document.getElementById('cards-grid');

  if (!grid) return;

  if (cards.length === 0) {
    grid.innerHTML =
      '<div class="empty-state" style="grid-column:1/-1">' +
        '<div class="empty-icon">📚</div>' +
        '<div class="empty-text">No modules loaded.<br>Upload card files to start.</div>' +
      '</div>';
    showPage('page-home');
    return;
  }

  grid.innerHTML = cards.map(function(c, i) {
    return '<div class="card" onclick="openCard(' + i + ')">' +
      '<div class="card-icon">' + (c.icon || '📖') + '</div>' +
      '<div class="card-title">' + (c.title || 'Card') + '</div>' +
      '<div class="card-desc">' + (c.desc || '') + '</div>' +
      '</div>';
  }).join('');

  showPage('page-home');
}

// ═══════════════════════════════════════════════════════════
// OPEN CARD (route to correct renderer)
// ═══════════════════════════════════════════════════════════
function openCard(idx) {
  var cards = getAllCards();
  if (idx < 0 || idx >= cards.length) return;

  state.currentCardIdx = idx;
  state.currentCard = cards[idx];
  state.backStack = [renderHome];        // root

  var c = state.currentCard;
  document.getElementById('detail-title').textContent = (c.icon || '') + ' ' + (c.title || 'Card');
  document.getElementById('detail-subtitle').textContent = c.desc || '';

  var content = document.getElementById('detail-content');
  content.innerHTML = '';

  // Route by type
  if (c.type === 'letters') {
    renderCard1(content, c);
  } else if (c.type === 'sounds') {
    renderCard2Menu(content, c);
  } else if (c.type === 'verbs') {
    renderCard3(content, c);
  } else if (c.type === 'beverbs') {
    renderCard4(content, c);
  } else if (c.type === 'modernverbs') {
    renderCard5(content, c);
  } else {
    content.innerHTML = '<p style="text-align:center;color:#94a3b8">Coming soon...</p>';
  }

  showPage('page-detail');
}

// ═══════════════════════════════════════════════════════════
// CARD 1 — LETTERS
// ═══════════════════════════════════════════════════════════
function renderCard1(container, card) {
  var letters = card.letters || [];
  var html = '<div style="text-align:center;margin-bottom:14px;color:#94a3b8;font-size:0.82rem">' +
    '👇 Letter पर click करो — sound, examples और practice' +
    '</div>';
  html += '<div class="letters-grid">';
  letters.forEach(function(l, i) {
    var ex = l.examples ? l.examples.slice(0, 3).join(', ') : '';
    html += '<div class="letter-card" onclick="startLetterGame(' + i + ')">' +
      '<div class="letter-big">' + l.capital + '</div>' +
      '<div class="letter-small">' + l.small + '</div>' +
      '<div class="letter-sound">' + l.sound + '</div>' +
      '<div class="letter-examples">' + ex + '</div>' +
      '</div>';
  });
  html += '</div>';
  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startLetterGame(0)" style="max-width:280px;margin:0 auto">🎮 Practice All Letters</button>' +
    '</div>';
  container.innerHTML = html;
}

function startLetterGame(startIdx) {
  var letters = state.currentCard.letters;
  if (!letters || !letters.length) return;

  var first = letters[startIdx] || letters[0];
  var ordered = [first].concat(letters.filter(function(x) { return x.capital !== first.capital; }));

  var questions = ordered.map(function(item) {
    var correct = item.sound;
    var others = letters.filter(function(x) { return x.sound !== correct; });
    return {
      emoji: '🔤',
      label: 'LETTER SOUND',
      question: '"' + item.capital + ' ' + item.small + '" का sound क्या है?',
      hint: 'Examples: ' + (item.examples ? item.examples.join(', ') : ''),
      options: shuffle([correct].concat(others.slice(0, 3).map(function(x) { return x.sound; }))),
      answer: correct
    };
  });

  startMCQGame(questions, '🔤 Letters Practice', 'A-Z Sounds', function() { openCard(state.currentCardIdx); });
}

// ═══════════════════════════════════════════════════════════
// CARD 2 — IPA + INDIAN SOUNDS
// ═══════════════════════════════════════════════════════════
function renderCard2Menu(container, card) {
  var html = '<div style="text-align:center;margin-bottom:16px;color:#94a3b8;font-size:0.82rem">' +
    '👇 Choose the type of sound practice' +
    '</div>';
  html += '<div class="menu-row">' +
    '<div class="menu-btn" onclick="openSoundType(\'ipa\')">' +
      '<div class="icon">🔤</div>' +
      '<div class="title">IPA Sound</div>' +
      '<div class="sub">20 vowels + 24 consonants</div>' +
    '</div>' +
    '<div class="menu-btn" onclick="openSoundType(\'indian\')">' +
      '<div class="icon">🇮🇳</div>' +
      '<div class="title">Indian Vowel & Consonant</div>' +
      '<div class="sub">5 vowels + 21 consonants</div>' +
    '</div>' +
  '</div>';
  container.innerHTML = html;
}

function openSoundType(type) {
  pushBack(function() { openCard(state.currentCardIdx); });
  var content = document.getElementById('detail-content');
  var card = state.currentCard;

  if (type === 'ipa') {
    document.getElementById('detail-title').textContent = '🔤 IPA Sound';
    document.getElementById('detail-subtitle').textContent = '20 vowels + 24 consonants';
    content.innerHTML =
      '<div style="text-align:center;margin-bottom:14px;color:#94a3b8;font-size:0.82rem">👇 Category चुनो</div>' +
      '<div class="sound-category" onclick="openIpaCategory(\'vowels\')">' +
        '<div class="sound-cat-icon">🅰️</div>' +
        '<div class="sound-cat-info">' +
          '<div class="sound-cat-title">Vowels</div>' +
          '<div class="sound-cat-desc">20 vowel sounds with 3 examples each</div>' +
        '</div>' +
      '</div>' +
      '<div class="sound-category" onclick="openIpaCategory(\'consonants\')">' +
        '<div class="sound-cat-icon">🅱️</div>' +
        '<div class="sound-cat-info">' +
          '<div class="sound-cat-title">Consonants</div>' +
          '<div class="sound-cat-desc">24 consonant sounds with 3 examples each</div>' +
        '</div>' +
      '</div>';
  } else {
    document.getElementById('detail-title').textContent = '🇮🇳 Indian Vowel & Consonant';
    document.getElementById('detail-subtitle').textContent = '5 vowels + 21 consonants';
    content.innerHTML =
      '<div style="text-align:center;margin-bottom:14px;color:#94a3b8;font-size:0.82rem">👇 Category चुनो</div>' +
      '<div class="sound-category" onclick="openIndianCategory(\'vowels\')">' +
        '<div class="sound-cat-icon">🅰️</div>' +
        '<div class="sound-cat-info">' +
          '<div class="sound-cat-title">Vowels</div>' +
          '<div class="sound-cat-desc">A, E, I, O, U — with 3 examples each</div>' +
        '</div>' +
      '</div>' +
      '<div class="sound-category" onclick="openIndianCategory(\'consonants\')">' +
        '<div class="sound-cat-icon">🅱️</div>' +
        '<div class="sound-cat-info">' +
          '<div class="sound-cat-title">Consonants</div>' +
          '<div class="sound-cat-desc">21 consonants — with 3 examples each</div>' +
        '</div>' +
      '</div>';
  }
  window.scrollTo(0, 0);
}

function openIpaCategory(catId) {
  pushBack(function() { openSoundType('ipa'); });
  var cat = (state.currentCard.sounds || []).find(function(c) { return c.id === catId; });
  if (!cat) return;

  document.getElementById('detail-title').textContent = cat.icon + ' ' + cat.title;
  document.getElementById('detail-subtitle').textContent = cat.items.length + ' sounds';

  var html = '<div class="letters-grid">';
  cat.items.forEach(function(item, i) {
    var ex = item.examples ? item.examples.slice(0, 3).join(', ') : '';
    html += '<div class="sound-item" onclick="startIpaGame(\'' + catId + '\', ' + i + ')">' +
      '<div class="sound-symbol">' + item.symbol + '</div>' +
      '<div class="sound-desc">' + item.sound + '</div>' +
      '<div class="sound-example">' + ex + '</div>' +
      '</div>';
  });
  html += '</div>';
  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startIpaGame(\'' + catId + '\', 0)" style="max-width:280px;margin:0 auto">🎮 Practice ' + cat.title + '</button>' +
    '</div>';
  document.getElementById('detail-content').innerHTML = html;
  window.scrollTo(0, 0);
}

function startIpaGame(catId, itemIdx) {
  var cat = (state.currentCard.sounds || []).find(function(c) { return c.id === catId; });
  if (!cat) return;
  var item = cat.items[itemIdx];
  if (!item) item = cat.items[0];

  var ordered = [item].concat(cat.items.filter(function(x) { return x.symbol !== item.symbol; }));
  var questions = ordered.map(function(it) {
    var correct = it.sound;
    var others = cat.items.filter(function(x) { return x.sound !== correct; });
    return {
      emoji: '🔊',
      label: cat.title.toUpperCase(),
      question: '"' + it.symbol + '" का sound क्या है?',
      hint: 'Examples: ' + it.examples.join(', '),
      options: shuffle([correct].concat(others.slice(0, 3).map(function(x) { return x.sound; }))),
      answer: correct
    };
  });
  startMCQGame(questions, '🔊 Sound Practice', cat.title, function() { openIpaCategory(catId); });
}

function openIndianCategory(catId) {
  pushBack(function() { openSoundType('indian'); });
  var card = state.currentCard;

  var items = [];
  if (catId === 'vowels') {
    items = [
      { symbol: 'A', sound: 'ए', examples: ['Apple', 'Ant', 'Aeroplane'] },
      { symbol: 'E', sound: 'ई', examples: ['Egg', 'Ear', 'Eye'] },
      { symbol: 'I', sound: 'आइ', examples: ['Ice', 'Ink', 'Iron'] },
      { symbol: 'O', sound: 'ओ', examples: ['Orange', 'Ox', 'Owl'] },
      { symbol: 'U', sound: 'यू', examples: ['Umbrella', 'Uncle', 'Urn'] }
    ];
  } else {
    'BCDFGHJKLMNPQRSTVWXYZ'.split('').forEach(function(ch) {
      var l = (card.letters || []).find(function(x) { return x.capital === ch; });
      if (l) items.push({ symbol: ch, sound: l.sound, examples: l.examples });
    });
  }

  document.getElementById('detail-title').textContent = catId === 'vowels' ? '🅰️ Vowels' : '🅱️ Consonants';
  document.getElementById('detail-subtitle').textContent = items.length + ' sounds';

  var html = '<div class="letters-grid">';
  items.forEach(function(item, i) {
    html += '<div class="sound-item" onclick="startIndianGame(\'' + catId + '\', ' + i + ')">' +
      '<div class="sound-symbol">' + item.symbol + '</div>' +
      '<div class="sound-desc">' + item.sound + '</div>' +
      '<div class="sound-example">' + item.examples.join(', ') + '</div>' +
      '</div>';
  });
  html += '</div>';
  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startIndianGame(\'' + catId + '\', 0)" style="max-width:280px;margin:0 auto">🎮 Practice</button>' +
    '</div>';
  document.getElementById('detail-content').innerHTML = html;
  window.scrollTo(0, 0);
}

function startIndianGame(catId, itemIdx) {
  var card = state.currentCard;
  var items = [];
  if (catId === 'vowels') {
    items = [
      { symbol: 'A', sound: 'ए', examples: ['Apple', 'Ant', 'Aeroplane'] },
      { symbol: 'E', sound: 'ई', examples: ['Egg', 'Ear', 'Eye'] },
      { symbol: 'I', sound: 'आइ', examples: ['Ice', 'Ink', 'Iron'] },
      { symbol: 'O', sound: 'ओ', examples: ['Orange', 'Ox', 'Owl'] },
      { symbol: 'U', sound: 'यू', examples: ['Umbrella', 'Uncle', 'Urn'] }
    ];
  } else {
    'BCDFGHJKLMNPQRSTVWXYZ'.split('').forEach(function(ch) {
      var l = (card.letters || []).find(function(x) { return x.capital === ch; });
      if (l) items.push({ symbol: ch, sound: l.sound, examples: l.examples });
    });
  }
  if (!items.length) return;
  var item = items[itemIdx] || items[0];
  var ordered = [item].concat(items.filter(function(x) { return x.symbol !== item.symbol; }));

  var questions = ordered.map(function(it) {
    var correct = it.sound;
    var others = items.filter(function(x) { return x.sound !== correct; });
    return {
      emoji: catId === 'vowels' ? '🅰️' : '🅱️',
      label: (catId === 'vowels' ? 'VOWEL' : 'CONSONANT') + ' SOUND',
      question: '"' + it.symbol + '" का sound क्या है?',
      hint: 'Examples: ' + it.examples.join(', '),
      options: shuffle([correct].concat(others.slice(0, 3).map(function(x) { return x.sound; }))),
      answer: correct
    };
  });
  startMCQGame(questions, '🔊 Sound Practice', catId === 'vowels' ? 'Vowels' : 'Consonants',
    function() { openIndianCategory(catId); });
}

// ═══════════════════════════════════════════════════════════
// CARD 3 — VERBS A-Z
// ═══════════════════════════════════════════════════════════
function renderCard3(container, card) {
  if (!card.groups || !card.groups.length) {
    container.innerHTML = '<p style="text-align:center;color:#94a3b8">No verbs yet</p>';
    return;
  }

  var html = '<div class="verb-letters" id="verb-letters-row">';
  html += '<button class="verb-letter-btn all-btn active" onclick="showVerbs(\'all\')">ALL</button>';
  card.groups.forEach(function(g) {
    html += '<button class="verb-letter-btn" onclick="showVerbs(\'' + g.letter + '\')">' + g.letter + '</button>';
  });
  html += '</div>';
  html += '<div id="verbs-list"></div>';
  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startVerbPractice()" style="max-width:280px;margin:0 auto">🎮 Practice Verbs</button>' +
    '</div>';
  container.innerHTML = html;

  setTimeout(function() { showVerbs('all'); }, 30);
}

function showVerbs(letter) {
  state.currentVerbLetter = letter;

  var btns = document.querySelectorAll('#verb-letters-row .verb-letter-btn');
  btns.forEach(function(b) {
    var isAll = b.textContent === 'ALL';
    var match = (letter === 'all' && isAll) || (b.textContent === letter && !isAll);
    b.classList.toggle('active', match);
  });

  var card = state.currentCard;
  var verbs = [];
  if (letter === 'all') {
    card.groups.forEach(function(g) { verbs = verbs.concat(g.verbs); });
  } else {
    var group = card.groups.find(function(g) { return g.letter === letter; });
    verbs = group ? group.verbs : [];
  }

  var listEl = document.getElementById('verbs-list');
  if (!listEl) return;

  if (!verbs.length) {
    listEl.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px">No verbs in this group</p>';
    return;
  }

  listEl.innerHTML = verbs.map(function(v) {
    return '<div class="verb-row">' +
      '<div class="verb-row-v1">' + v.v1 + '</div>' +
      '<div class="verb-row-v2">' + v.v2 + '</div>' +
      '<div class="verb-row-v3">' + v.v3 + '</div>' +
      '<div class="verb-row-hi">' + v.hi + '</div>' +
      '</div>';
  }).join('');
}

function startVerbPractice() {
  var card = state.currentCard;
  var verbs = [];
  if (state.currentVerbLetter && state.currentVerbLetter !== 'all') {
    var g = card.groups.find(function(x) { return x.letter === state.currentVerbLetter; });
    verbs = g ? g.verbs.slice() : [];
  } else {
    card.groups.forEach(function(g) { verbs = verbs.concat(g.verbs); });
  }

  if (!verbs.length) { alert('No verbs to practice'); return; }

  verbs = shuffle(verbs).slice(0, 10);
  var questions = [];

  verbs.forEach(function(v) {
    var othersV2 = verbs.filter(function(x) { return x.v2 !== v.v2; }).map(function(x) { return x.v2; });
    questions.push({
      emoji: '🔢',
      label: 'V2 (PAST)',
      question: '"' + v.v1 + '" का V2 क्या है?',
      hint: 'V1: ' + v.v1 + ' · Meaning: ' + v.hi,
      options: shuffle([v.v2].concat(othersV2.slice(0, 3))),
      answer: v.v2
    });
    var othersV3 = verbs.filter(function(x) { return x.v3 !== v.v3; }).map(function(x) { return x.v3; });
    questions.push({
      emoji: '🔢',
      label: 'V3 (PAST PARTICIPLE)',
      question: '"' + v.v1 + '" का V3 क्या है?',
      hint: 'V1: ' + v.v1 + ' · Meaning: ' + v.hi,
      options: shuffle([v.v3].concat(othersV3.slice(0, 3))),
      answer: v.v3
    });
  });

  startMCQGame(questions, '🎮 Verb Practice', 'V2 / V3', function() { openCard(state.currentCardIdx); });
}

// ═══════════════════════════════════════════════════════════
// CARD 4 — BE VERBS (book style)
// ═══════════════════════════════════════════════════════════
function renderCard4(container, card) {
  var html = '<div style="text-align:center;margin-bottom:14px;color:#94a3b8;font-size:0.82rem">' +
    '👇 Verb पर click करो — rule, sentences और practice' +
    '</div>';
  (card.verbs || []).forEach(function(v, i) {
    html += '<div class="list-item" style="background:#131828;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:8px;cursor:pointer;transition:all 0.15s" onclick="openBeVerbDetail(' + i + ')">' +
      '<div style="font-size:0.98rem;font-weight:800;margin-bottom:4px">' + v.word + ' <span style="color:#4ade80">= ' + v.hi + '</span></div>' +
      '<div style="font-size:0.78rem;color:#94a3b8">' + v.usage + '</div>' +
      '</div>';
  });
  container.innerHTML = html;
}

function openBeVerbDetail(idx) {
  pushBack(function() { openCard(state.currentCardIdx); });
  state.currentBeVerbIdx = idx;

  var v = state.currentCard.verbs[idx];
  document.getElementById('detail-title').textContent = '🔗 ' + v.word;
  document.getElementById('detail-subtitle').textContent = v.usage;

  var html = '<div class="verb-header">' +
    '<div class="verb-word-big">' + v.word + '</div>' +
    '<div class="verb-meaning">' + v.hi + '</div>' +
    '<div class="verb-usage-text">' + v.usage + '</div>' +
    '</div>';

  // Rule section
  if (v.rule) {
    html += '<div class="lesson-rule"><strong>Rule:</strong> ' + v.rule + '</div>';
  }

  // Positive
  html += renderBookSection('✅', 'Positive Sentences', v.positive);
  // Negative
  html += renderBookSection('❌', 'Negative Sentences', v.negative);
  // WH Questions
  html += renderBookSection('❓', 'WH Questions', v.wh);

  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startBeVerbPractice()" style="max-width:300px;margin:0 auto">🎮 Practice ' + v.word + '</button>' +
    '</div>';

  document.getElementById('detail-content').innerHTML = html;
  window.scrollTo(0, 0);
}

function renderBookSection(icon, title, section) {
  if (!section) return '';
  var html = '<div class="lesson-section">' +
    '<div class="lesson-section-title">' + icon + ' ' + title + '</div>';
  if (section.rule) {
    html += '<div class="lesson-rule" style="border-color:#4ade80"><strong>Formula:</strong> ' + section.rule + '</div>';
  }
  (section.examples || []).forEach(function(ex, i) {
    html += '<div class="example-row">' +
      '<div class="example-num">' + (i + 1) + '</div>' +
      '<div class="example-body">' +
        '<div class="example-en">' + ex.en + '</div>' +
        '<div class="example-hi">' + ex.hi + '</div>' +
      '</div>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

function startBeVerbPractice() {
  var v = state.currentCard.verbs[state.currentBeVerbIdx];
  startPuzzleGame(v, function() { openBeVerbDetail(state.currentBeVerbIdx); });
}

// ═══════════════════════════════════════════════════════════
// CARD 5 — MODERN VERBS (book style)
// ═══════════════════════════════════════════════════════════
function renderCard5(container, card) {
  var html = '<div style="text-align:center;margin-bottom:14px;color:#94a3b8;font-size:0.82rem">' +
    '👇 Verb पर click करो — rule, sentences और practice' +
    '</div>';
  (card.verbs || []).forEach(function(v, i) {
    html += '<div class="list-item" style="background:#131828;border:1px solid #1e293b;border-radius:12px;padding:14px;margin-bottom:8px;cursor:pointer;transition:all 0.15s" onclick="openModernVerbDetail(' + i + ')">' +
      '<div style="font-size:0.98rem;font-weight:800;margin-bottom:4px">' + v.word + ' <span style="color:#4ade80">= ' + v.hi + '</span></div>' +
      '<div style="font-size:0.78rem;color:#94a3b8">' + v.usage + '</div>' +
      '</div>';
  });
  container.innerHTML = html;
}

function openModernVerbDetail(idx) {
  pushBack(function() { openCard(state.currentCardIdx); });
  state.currentModernVerbIdx = idx;

  var v = state.currentCard.verbs[idx];
  document.getElementById('detail-title').textContent = '🎭 ' + v.word;
  document.getElementById('detail-subtitle').textContent = v.usage;

  var html = '<div class="verb-header">' +
    '<div class="verb-word-big">' + v.word + '</div>' +
    '<div class="verb-meaning">' + v.hi + '</div>' +
    '<div class="verb-usage-text">' + v.usage + '</div>' +
    '</div>';

  if (v.rule) {
    html += '<div class="lesson-rule"><strong>Rule:</strong> ' + v.rule + '</div>';
  }

  html += renderBookSection('✅', 'Positive Sentences', v.positive);
  html += renderBookSection('❌', 'Negative Sentences', v.negative);
  html += renderBookSection('❓', 'WH Questions', v.wh);

  html += '<div style="text-align:center;margin-top:18px;padding-bottom:40px">' +
    '<button class="btn" onclick="startModernVerbPractice()" style="max-width:300px;margin:0 auto">🎮 Practice ' + v.word + '</button>' +
    '</div>';

  document.getElementById('detail-content').innerHTML = html;
  window.scrollTo(0, 0);
}

function startModernVerbPractice() {
  var v = state.currentCard.verbs[state.currentModernVerbIdx];
  startPuzzleGame(v, function() { openModernVerbDetail(state.currentModernVerbIdx); });
}

// ═══════════════════════════════════════════════════════════
// PUZZLE GAME — Hindi→English, English→Hindi (word bank)
// ═══════════════════════════════════════════════════════════
function startPuzzleGame(verb, returnFn) {
  var positives = (verb.positive && verb.positive.examples) || [];
  var negatives = (verb.negative && verb.negative.examples) || [];
  var whs = (verb.wh && verb.wh.examples) || [];

  // Mix and pick 5 for Hindi→English
  var poolHiToEn = shuffle(positives.concat(negatives)).slice(0, 5);
  // Pick 5 for English→Hindi
  var poolEnToHi = shuffle(positives.concat(whs)).slice(0, 5);

  // Collect all words for distractors
  var allWords = [];
  positives.concat(negatives).concat(whs).forEach(function(s) {
    if (s.words) s.words.forEach(function(w) {
      var clean = String(w).trim();
      if (clean && allWords.indexOf(clean) === -1) allWords.push(clean);
    });
  });

  var questions = [];
  poolHiToEn.forEach(function(s) {
    var ans = s.words ? s.words.slice() : s.en.split(' ');
    var distractors = pickDistractors(allWords, ans, 2, 4);
    questions.push({
      mode: 'hi-en',
      prompt: s.hi,
      promptHint: 'इसका English बनाओ',
      answer: ans,
      words: shuffle(ans.concat(distractors))
    });
  });
  poolEnToHi.forEach(function(s) {
    var ans = s.words ? s.words.slice() : s.en.split(' ');
    var distractors = pickDistractors(allWords, ans, 2, 4);
    questions.push({
      mode: 'en-hi',
      prompt: s.en,
      promptHint: 'इसका Hindi बनाओ (English में शब्द arrange करो)',
      answer: ans,
      words: shuffle(ans.concat(distractors))
    });
  });

  state.puzzle = {
    questions: questions,
    idx: 0,
    correct: 0,
    placed: [],
    usedIdx: [],
    returnFn: returnFn,
    verb: verb
  };

  document.getElementById('game-title').textContent = '🎮 Practice · ' + verb.word;
  document.getElementById('game-subtitle').textContent = verb.hi + ' · Sentence builder';
  state.gameType = 'puzzle';
  state.gameReturnFn = returnFn;

  showPage('page-game');
  renderPuzzleQuestion();
}

function pickDistractors(pool, answer, minC, maxC) {
  var lowerAns = answer.map(function(w) { return String(w).toLowerCase().trim(); });
  var avail = pool.filter(function(w) { return lowerAns.indexOf(String(w).toLowerCase().trim()) === -1; });
  var count = minC + Math.floor(Math.random() * (maxC - minC + 1));
  var picked = [];
  var sh = shuffle(avail);
  for (var i = 0; i < sh.length && picked.length < count; i++) {
    if (picked.indexOf(sh[i]) === -1) picked.push(sh[i]);
  }
  return picked;
}

function renderPuzzleQuestion() {
  var p = state.puzzle;
  if (!p) return;
  var q = p.questions[p.idx];
  var total = p.questions.length;
  document.getElementById('game-progress-fill').style.width = ((p.idx + 1) / total * 100) + '%';

  p.placed = [];
  p.usedIdx = [];

  var isHiEn = q.mode === 'hi-en';
  var label = isHiEn ? '🇮🇳 Hindi → English' : '🇬🇧 English → Hindi';
  var promptColor = isHiEn ? '#4ade80' : '#60a5fa';

  var html = '<div class="puzzle-prompt">' +
    '<div class="puzzle-prompt-lang">' + label + '</div>' +
    '<div class="puzzle-prompt-text" style="color:' + promptColor + '">' + q.prompt + '</div>' +
    '<div class="puzzle-prompt-hint">' + q.promptHint + '</div>' +
    '</div>';
  html += '<div class="puzzle-slots" id="puzzle-slots"></div>';
  html += '<div class="puzzle-bank" id="puzzle-bank"></div>';
  html += '<div class="game-feedback" id="puzzle-feedback"></div>';
  html += '<button class="game-next" id="puzzle-next" onclick="nextPuzzleQ()">' +
    (p.idx === total - 1 ? '🏁 Result' : '➡️ Next') + '</button>';

  document.getElementById('game-content').innerHTML = html;
  renderPuzzleSlotsAndBank();
}

function renderPuzzleSlotsAndBank() {
  var p = state.puzzle;
  if (!p) return;
  var q = p.questions[p.idx];
  var slotsEl = document.getElementById('puzzle-slots');
  var bankEl = document.getElementById('puzzle-bank');
  if (!slotsEl || !bankEl) return;

  var slotsHtml = '';
  for (var i = 0; i < q.answer.length; i++) {
    var val = p.placed[i];
    var cls = 'puzzle-slot' + (val ? ' filled' : '');
    slotsHtml += '<div class="' + cls + '" onclick="removePuzzleSlot(' + i + ')">' + (val || '?') + '</div>';
  }
  slotsEl.innerHTML = slotsHtml;

  bankEl.innerHTML = q.words.map(function(w, i) {
    var used = p.usedIdx.indexOf(i) > -1;
    return '<div class="puzzle-word' + (used ? ' used' : '') + '" onclick="placePuzzleSlot(' + i + ')">' + w + '</div>';
  }).join('');

  var complete = p.placed.length === q.answer.length && p.placed.every(function(v) { return v; });
  var fb = document.getElementById('puzzle-feedback');
  var nextBtn = document.getElementById('puzzle-next');

  if (complete) {
    var isCorrect = p.placed.every(function(v, i) { return v === q.answer[i]; });
    if (isCorrect) {
      fb.style.color = '#4ade80';
      fb.textContent = '✅ Correct!';
      nextBtn.classList.add('show');
      nextBtn.textContent = p.idx === p.questions.length - 1 ? '🏁 Result' : '➡️ Next';
    } else {
      fb.style.color = '#f87171';
      fb.textContent = '❌ Order गलत है — फिर try करो';
      setTimeout(function() {
        p.placed = [];
        p.usedIdx = [];
        renderPuzzleSlotsAndBank();
      }, 800);
    }
  } else {
    fb.style.color = '#94a3b8';
    fb.textContent = p.placed.filter(function(x) { return x; }).length + '/' + q.answer.length + ' words placed';
    nextBtn.classList.remove('show');
  }
}

function placePuzzleSlot(wordIdx) {
  var p = state.puzzle;
  if (!p) return;
  var q = p.questions[p.idx];
  if (p.usedIdx.indexOf(wordIdx) > -1) return;
  if (p.placed.length >= q.answer.length) return;
  p.placed.push(q.words[wordIdx]);
  p.usedIdx.push(wordIdx);
  renderPuzzleSlotsAndBank();
}

function removePuzzleSlot(slotIdx) {
  var p = state.puzzle;
  if (!p) return;
  if (slotIdx >= p.placed.length) return;
  p.placed.splice(slotIdx, 1);
  p.usedIdx.splice(slotIdx, 1);
  renderPuzzleSlotsAndBank();
}

function nextPuzzleQ() {
  var p = state.puzzle;
  if (!p) return;
  var q = p.questions[p.idx];
  var isCorrect = p.placed.every(function(v, i) { return v === q.answer[i]; });
  if (isCorrect) {
    p.correct++;
    p.idx++;
    if (p.idx >= p.questions.length) {
      showPuzzleResult();
    } else {
      renderPuzzleQuestion();
    }
  }
}

function showPuzzleResult() {
  var p = state.puzzle;
  var total = p.questions.length;
  var pct = Math.round((p.correct / total) * 100);
  var emoji = '🏆', title = 'Excellent!';
  if (pct < 40) { emoji = '🌱'; title = 'Keep Trying!'; }
  else if (pct < 70) { emoji = '👍'; title = 'Good Job!'; }
  else if (pct < 90) { emoji = '🔥'; title = 'Great!'; }
  else { emoji = '👑'; title = 'Legendary!'; }

  document.getElementById('game-content').innerHTML =
    '<div class="result-card">' +
      '<div class="result-emoji">' + emoji + '</div>' +
      '<div class="result-title">' + title + '</div>' +
      '<div class="result-stats">' +
        '<div class="result-stat"><div class="result-stat-value">' + p.correct + '/' + total + '</div><div class="result-stat-label">Correct</div></div>' +
        '<div class="result-stat"><div class="result-stat-value">' + pct + '%</div><div class="result-stat-label">Accuracy</div></div>' +
      '</div>' +
      '<button class="btn" onclick="closeGame()">← Back</button>' +
    '</div>';
  document.getElementById('game-progress-fill').style.width = '100%';
}

// ═══════════════════════════════════════════════════════════
// MCQ GAME
// ═══════════════════════════════════════════════════════════
function startMCQGame(questions, title, sub, returnFn) {
  if (!questions || !questions.length) { alert('No questions'); return; }
  state.gameQuestions = questions;
  state.gameIdx = 0;
  state.gameCorrect = 0;
  state.gameWrong = 0;
  state.gameType = 'mcq';
  state.gameReturnFn = returnFn;

  document.getElementById('game-title').textContent = title;
  document.getElementById('game-subtitle').textContent = sub;
  showPage('page-game');
  renderMCQQuestion();
}

function renderMCQQuestion() {
  var q = state.gameQuestions[state.gameIdx];
  var total = state.gameQuestions.length;
  document.getElementById('game-progress-fill').style.width = ((state.gameIdx + 1) / total * 100) + '%';

  var html = '<div class="game-question">';
  if (q.emoji) html += '<span class="game-q-emoji">' + q.emoji + '</span>';
  if (q.label) html += '<div class="game-label">' + q.label + '</div>';
  html += '<div class="game-q-text">' + q.question + '</div>';
  if (q.hint) html += '<div class="game-q-hint">' + q.hint + '</div>';
  html += '</div><div class="game-options">';
  q.options.forEach(function(o, i) {
    html += '<div class="game-option" onclick="pickMCQAnswer(' + i + ')">' +
      '<div class="game-option-letter">' + String.fromCharCode(65 + i) + '</div>' +
      '<div>' + o + '</div>' +
      '</div>';
  });
  html += '</div>';
  html += '<div class="game-feedback" id="game-feedback"></div>';
  html += '<button class="game-next" id="game-next" onclick="nextMCQ()">' +
    (state.gameIdx === total - 1 ? '🏁 Result' : '➡️ Next') + '</button>';

  document.getElementById('game-content').innerHTML = html;
}

function pickMCQAnswer(idx) {
  var q = state.gameQuestions[state.gameIdx];
  var opts = document.querySelectorAll('.game-option');
  opts.forEach(function(o) { o.style.pointerEvents = 'none'; });
  var fb = document.getElementById('game-feedback');

  if (q.options[idx] === q.answer) {
    opts[idx].classList.add('correct');
    fb.style.color = '#4ade80';
    fb.textContent = '✅ Correct!';
    state.gameCorrect++;
    document.getElementById('game-next').classList.add('show');
  } else {
    opts[idx].classList.add('wrong');
    fb.style.color = '#f87171';
    fb.textContent = '❌ गलत — फिर try करो';
    setTimeout(function() {
      opts.forEach(function(o) {
        o.classList.remove('wrong', 'correct');
        o.style.pointerEvents = 'auto';
      });
      fb.style.color = '#60a5fa';
      fb.textContent = '🔄 फिर से try करो';
    }, 700);
  }
}

function nextMCQ() {
  state.gameIdx++;
  if (state.gameIdx >= state.gameQuestions.length) {
    showMCQResult();
  } else {
    renderMCQQuestion();
  }
}

function showMCQResult() {
  var total = state.gameQuestions.length;
  var correct = state.gameCorrect;
  var pct = Math.round((correct / total) * 100);
  var emoji = '🏆', title = 'Excellent!';
  if (pct < 40) { emoji = '🌱'; title = 'Keep Trying!'; }
  else if (pct < 70) { emoji = '👍'; title = 'Good Job!'; }
  else if (pct < 90) { emoji = '🔥'; title = 'Great!'; }
  else { emoji = '👑'; title = 'Legendary!'; }

  document.getElementById('game-content').innerHTML =
    '<div class="result-card">' +
      '<div class="result-emoji">' + emoji + '</div>' +
      '<div class="result-title">' + title + '</div>' +
      '<div class="result-stats">' +
        '<div class="result-stat"><div class="result-stat-value">' + correct + '/' + total + '</div><div class="result-stat-label">Correct</div></div>' +
        '<div class="result-stat"><div class="result-stat-value">' + pct + '%</div><div class="result-stat-label">Accuracy</div></div>' +
      '</div>' +
      '<button class="btn" onclick="restartMCQ()">🔁 Try Again</button>' +
      '<button class="btn sec" onclick="closeGame()">← Back</button>' +
    '</div>';
  document.getElementById('game-progress-fill').style.width = '100%';
}

function restartMCQ() {
  state.gameIdx = 0;
  state.gameCorrect = 0;
  state.gameWrong = 0;
  renderMCQQuestion();
}

// ═══════════════════════════════════════════════════════════
// CLOSE GAME
// ═══════════════════════════════════════════════════════════
function closeGame() {
  var returnFn = state.gameReturnFn;
  state.gameReturnFn = null;
  state.gameQuestions = [];
  state.gameIdx = 0;
  state.puzzle = null;

  if (returnFn) {
    returnFn();
  } else {
    openCard(state.currentCardIdx);
  }
}

// ═══════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
function initApp() {
  renderHome();
  console.log('📚 English Mastery — ready');
}
