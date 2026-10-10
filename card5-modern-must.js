// card5-modern-must.js — Modern Verb: must

var CARD5_MODERN_MUST = {
  word: 'must',
  hi: 'ज़रूर / अवश्य',
  usage: 'Strong necessity (पक्की ज़रूरत)',
  rule: 'Subject + must + Verb (base form)',

  positive: {
    rule: 'You must study hard. (तुम्हें मेहनत करनी ही चाहिए।)',
    examples: [
      { en: 'You must study hard.', hi: 'तुम्हें मेहनत करनी ही चाहिए।', words: ['You', 'must', 'study', 'hard'] },
      { en: 'He must see a doctor.', hi: 'उसे डॉक्टर को दिखाना ही चाहिए।', words: ['He', 'must', 'see', 'a', 'doctor'] },
      { en: 'We must help the poor.', hi: 'हमें गरीबों की मदद करनी ही चाहिए।', words: ['We', 'must', 'help', 'the', 'poor'] },
      { en: 'She must take rest.', hi: 'उसे आराम करना ही चाहिए।', words: ['She', 'must', 'take', 'rest'] },
      { en: 'They must come on time.', hi: 'उन्हें समय पर आना ही चाहिए।', words: ['They', 'must', 'come', 'on', 'time'] },
      { en: 'I must wake up early.', hi: 'मुझे जल्दी उठना ही चाहिए।', words: ['I', 'must', 'wake', 'up', 'early'] },
      { en: 'You must respect elders.', hi: 'तुम्हें बड़ों का सम्मान करना ही चाहिए।', words: ['You', 'must', 'respect', 'elders'] },
      { en: 'He must exercise daily.', hi: 'उसे रोज़ व्यायाम करना ही चाहिए।', words: ['He', 'must', 'exercise', 'daily'] },
      { en: 'We must save money.', hi: 'हमें पैसे बचाने ही चाहिए।', words: ['We', 'must', 'save', 'money'] },
      { en: 'She must learn English.', hi: 'उसे English सीखनी ही चाहिए।', words: ['She', 'must', 'learn', 'English'] }
    ]
  },

  negative: {
    rule: 'You must not study hard. (तुम्हें मेहनत नहीं करनी चाहिए।)',
    examples: [
      { en: 'You must not study hard.', hi: 'तुम्हें मेहनत नहीं करनी चाहिए।', words: ['You', 'must', 'not', 'study', 'hard'] },
      { en: 'He must not see a doctor.', hi: 'उसे डॉक्टर को नहीं दिखाना चाहिए।', words: ['He', 'must', 'not', 'see', 'a', 'doctor'] },
      { en: 'We must not help the poor.', hi: 'हमें गरीबों की मदद नहीं करनी चाहिए।', words: ['We', 'must', 'not', 'help', 'the', 'poor'] },
      { en: 'She must not take rest.', hi: 'उसे आराम नहीं करना चाहिए।', words: ['She', 'must', 'not', 'take', 'rest'] },
      { en: 'They must not come late.', hi: 'उन्हें देर से नहीं आना चाहिए।', words: ['They', 'must', 'not', 'come', 'late'] },
      { en: 'I must not wake up late.', hi: 'मुझे देर से नहीं उठना चाहिए।', words: ['I', 'must', 'not', 'wake', 'up', 'late'] },
      { en: 'You must not disrespect elders.', hi: 'तुम्हें बड़ों का अपमान नहीं करना चाहिए।', words: ['You', 'must', 'not', 'disrespect', 'elders'] },
      { en: 'He must not skip exercise.', hi: 'उसे व्यायाम नहीं छोड़ना चाहिए।', words: ['He', 'must', 'not', 'skip', 'exercise'] },
      { en: 'We must not waste money.', hi: 'हमें पैसे बर्बाद नहीं करने चाहिए।', words: ['We', 'must', 'not', 'waste', 'money'] },
      { en: 'She must not skip English.', hi: 'उसे English नहीं छोड़नी चाहिए।', words: ['She', 'must', 'not', 'skip', 'English'] }
    ]
  },

  wh: {
    rule: 'What must I do? (मुझे क्या करना ही चाहिए?)',
    examples: [
      { en: 'What must I do?', hi: 'मुझे क्या करना ही चाहिए?', words: ['What', 'must', 'I', 'do'] },
      { en: 'Why must he see a doctor?', hi: 'उसे डॉक्टर को क्यों दिखाना ही चाहिए?', words: ['Why', 'must', 'he', 'see', 'a', 'doctor'] },
      { en: 'Whom must we help?', hi: 'हमें किसकी मदद करनी ही चाहिए?', words: ['Whom', 'must', 'we', 'help'] },
      { en: 'Why must she take rest?', hi: 'उसे आराम क्यों करना ही चाहिए?', words: ['Why', 'must', 'she', 'take', 'rest'] },
      { en: 'When must they come?', hi: 'उन्हें कब आना ही चाहिए?', words: ['When', 'must', 'they', 'come'] },
      { en: 'Why must I wake up early?', hi: 'मुझे जल्दी क्यों उठना ही चाहिए?', words: ['Why', 'must', 'I', 'wake', 'up', 'early'] },
      { en: 'How must we respect elders?', hi: 'हमें बड़ों का सम्मान कैसे करना ही चाहिए?', words: ['How', 'must', 'we', 'respect', 'elders'] },
      { en: 'How often must he exercise?', hi: 'उसे कितनी बार व्यायाम करना ही चाहिए?', words: ['How', 'often', 'must', 'he', 'exercise'] },
      { en: 'How much must we save?', hi: 'हमें कितना बचाना ही चाहिए?', words: ['How', 'much', 'must', 'we', 'save'] },
      { en: 'Why must she learn English?', hi: 'उसे English क्यों सीखनी ही चाहिए?', words: ['Why', 'must', 'she', 'learn', 'English'] }
    ]
  }
};
