// card5-modern-should.js — Modern Verb: should

var CARD5_MODERN_SHOULD = {
  word: 'should',
  hi: 'चाहिए',
  usage: 'Advice (सलाह)',
  rule: 'Subject + should + Verb (base form)',

  positive: {
    rule: 'You should study hard. (तुम्हें मेहनत करनी चाहिए।)',
    examples: [
      { en: 'You should study hard.', hi: 'तुम्हें मेहनत करनी चाहिए।', words: ['You', 'should', 'study', 'hard'] },
      { en: 'He should see a doctor.', hi: 'उसे डॉक्टर को दिखाना चाहिए।', words: ['He', 'should', 'see', 'a', 'doctor'] },
      { en: 'We should help others.', hi: 'हमें दूसरों की मदद करनी चाहिए।', words: ['We', 'should', 'help', 'others'] },
      { en: 'She should take rest.', hi: 'उसे आराम करना चाहिए।', words: ['She', 'should', 'take', 'rest'] },
      { en: 'They should come early.', hi: 'उन्हें जल्दी आना चाहिए।', words: ['They', 'should', 'come', 'early'] },
      { en: 'I should wake up early.', hi: 'मुझे जल्दी उठना चाहिए।', words: ['I', 'should', 'wake', 'up', 'early'] },
      { en: 'You should respect your elders.', hi: 'तुम्हें बड़ों का सम्मान करना चाहिए।', words: ['You', 'should', 'respect', 'your', 'elders'] },
      { en: 'He should exercise daily.', hi: 'उसे रोज़ व्यायाम करना चाहिए।', words: ['He', 'should', 'exercise', 'daily'] },
      { en: 'We should save money.', hi: 'हमें पैसे बचाने चाहिए।', words: ['We', 'should', 'save', 'money'] },
      { en: 'She should learn English.', hi: 'उसे English सीखनी चाहिए।', words: ['She', 'should', 'learn', 'English'] }
    ]
  },

  negative: {
    rule: 'You should not study hard. (तुम्हें मेहनत नहीं करनी चाहिए।)',
    examples: [
      { en: 'You should not study hard.', hi: 'तुम्हें मेहनत नहीं करनी चाहिए।', words: ['You', 'should', 'not', 'study', 'hard'] },
      { en: 'He should not see a doctor.', hi: 'उसे डॉक्टर को नहीं दिखाना चाहिए।', words: ['He', 'should', 'not', 'see', 'a', 'doctor'] },
      { en: 'We should not help others.', hi: 'हमें दूसरों की मदद नहीं करनी चाहिए।', words: ['We', 'should', 'not', 'help', 'others'] },
      { en: 'She should not take rest.', hi: 'उसे आराम नहीं करना चाहिए।', words: ['She', 'should', 'not', 'take', 'rest'] },
      { en: 'They should not come early.', hi: 'उन्हें जल्दी नहीं आना चाहिए।', words: ['They', 'should', 'not', 'come', 'early'] },
      { en: 'I should not wake up early.', hi: 'मुझे जल्दी नहीं उठना चाहिए।', words: ['I', 'should', 'not', 'wake', 'up', 'early'] },
      { en: 'You should not disrespect elders.', hi: 'तुम्हें बड़ों का अपमान नहीं करना चाहिए।', words: ['You', 'should', 'not', 'disrespect', 'elders'] },
      { en: 'He should not exercise daily.', hi: 'उसे रोज़ व्यायाम नहीं करना चाहिए।', words: ['He', 'should', 'not', 'exercise', 'daily'] },
      { en: 'We should not waste money.', hi: 'हमें पैसे बर्बाद नहीं करने चाहिए।', words: ['We', 'should', 'not', 'waste', 'money'] },
      { en: 'She should not skip English.', hi: 'उसे English नहीं छोड़नी चाहिए।', words: ['She', 'should', 'not', 'skip', 'English'] }
    ]
  },

  wh: {
    rule: 'What should I do? (मुझे क्या करना चाहिए?)',
    examples: [
      { en: 'What should I do?', hi: 'मुझे क्या करना चाहिए?', words: ['What', 'should', 'I', 'do'] },
      { en: 'Why should he see a doctor?', hi: 'उसे डॉक्टर को क्यों दिखाना चाहिए?', words: ['Why', 'should', 'he', 'see', 'a', 'doctor'] },
      { en: 'Whom should we help?', hi: 'हमें किसकी मदद करनी चाहिए?', words: ['Whom', 'should', 'we', 'help'] },
      { en: 'Why should she take rest?', hi: 'उसे आराम क्यों करना चाहिए?', words: ['Why', 'should', 'she', 'take', 'rest'] },
      { en: 'When should they come?', hi: 'उन्हें कब आना चाहिए?', words: ['When', 'should', 'they', 'come'] },
      { en: 'Why should I wake up early?', hi: 'मुझे जल्दी क्यों उठना चाहिए?', words: ['Why', 'should', 'I', 'wake', 'up', 'early'] },
      { en: 'How should we respect elders?', hi: 'हमें बड़ों का सम्मान कैसे करना चाहिए?', words: ['How', 'should', 'we', 'respect', 'elders'] },
      { en: 'How often should he exercise?', hi: 'उसे कितनी बार व्यायाम करना चाहिए?', words: ['How', 'often', 'should', 'he', 'exercise'] },
      { en: 'How much should we save?', hi: 'हमें कितना बचाना चाहिए?', words: ['How', 'much', 'should', 'we', 'save'] },
      { en: 'Why should she learn English?', hi: 'उसे English क्यों सीखनी चाहिए?', words: ['Why', 'should', 'she', 'learn', 'English'] }
    ]
  }
};
