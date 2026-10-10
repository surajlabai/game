// card5-modern-need.js — Modern Verb: need

var CARD5_MODERN_NEED = {
  word: 'need',
  hi: 'ज़रूरत है',
  usage: 'Necessity (आवश्यकता)',
  rule: 'Subject + need / needs + Object',
  ruleExtra: 'I/We/You/They → need · He/She/It → needs',

  positive: {
    rule: 'I need your help. (मुझे तुम्हारी मदद चाहिए।)',
    examples: [
      { en: 'I need your help.', hi: 'मुझे तुम्हारी मदद चाहिए।', words: ['I', 'need', 'your', 'help'] },
      { en: 'You need to study.', hi: 'तुम्हें पढ़ाई करनी है।', words: ['You', 'need', 'to', 'study'] },
      { en: 'He needs a doctor.', hi: 'उसे डॉक्टर की ज़रूरत है।', words: ['He', 'needs', 'a', 'doctor'] },
      { en: 'She needs rest.', hi: 'उसे आराम की ज़रूरत है।', words: ['She', 'needs', 'rest'] },
      { en: 'We need more time.', hi: 'हमें और समय चाहिए।', words: ['We', 'need', 'more', 'time'] },
      { en: 'They need money.', hi: 'उन्हें पैसे चाहिए।', words: ['They', 'need', 'money'] },
      { en: 'I need to sleep.', hi: 'मुझे सोने की ज़रूरत है।', words: ['I', 'need', 'to', 'sleep'] },
      { en: 'You need to exercise.', hi: 'तुम्हें व्यायाम करना है।', words: ['You', 'need', 'to', 'exercise'] },
      { en: 'He needs a new phone.', hi: 'उसे नया फ़ोन चाहिए।', words: ['He', 'needs', 'a', 'new', 'phone'] },
      { en: 'She needs to improve.', hi: 'उसे सुधार की ज़रूरत है।', words: ['She', 'needs', 'to', 'improve'] }
    ]
  },

  negative: {
    rule: 'I do not need your help. (मुझे तुम्हारी मदद नहीं चाहिए।)',
    examples: [
      { en: 'I do not need your help.', hi: 'मुझे तुम्हारी मदद नहीं चाहिए।', words: ['I', 'do', 'not', 'need', 'your', 'help'] },
      { en: 'You do not need to study.', hi: 'तुम्हें पढ़ाई नहीं करनी है।', words: ['You', 'do', 'not', 'need', 'to', 'study'] },
      { en: 'He does not need a doctor.', hi: 'उसे डॉक्टर की ज़रूरत नहीं है।', words: ['He', 'does', 'not', 'need', 'a', 'doctor'] },
      { en: 'She does not need rest.', hi: 'उसे आराम की ज़रूरत नहीं है।', words: ['She', 'does', 'not', 'need', 'rest'] },
      { en: 'We do not need more time.', hi: 'हमें और समय नहीं चाहिए।', words: ['We', 'do', 'not', 'need', 'more', 'time'] },
      { en: 'They do not need money.', hi: 'उन्हें पैसे नहीं चाहिए।', words: ['They', 'do', 'not', 'need', 'money'] },
      { en: 'I do not need to sleep.', hi: 'मुझे सोने की ज़रूरत नहीं है।', words: ['I', 'do', 'not', 'need', 'to', 'sleep'] },
      { en: 'You do not need to exercise.', hi: 'तुम्हें व्यायाम नहीं करना है।', words: ['You', 'do', 'not', 'need', 'to', 'exercise'] },
      { en: 'He does not need a new phone.', hi: 'उसे नया फ़ोन नहीं चाहिए।', words: ['He', 'does', 'not', 'need', 'a', 'new', 'phone'] },
      { en: 'She does not need to improve.', hi: 'उसे सुधार की ज़रूरत नहीं है।', words: ['She', 'does', 'not', 'need', 'to', 'improve'] }
    ]
  },

  wh: {
    rule: 'What do I need? (मुझे क्या चाहिए?)',
    examples: [
      { en: 'What do I need?', hi: 'मुझे क्या चाहिए?', words: ['What', 'do', 'I', 'need'] },
      { en: 'Why do you need to study?', hi: 'तुम्हें पढ़ाई क्यों करनी है?', words: ['Why', 'do', 'you', 'need', 'to', 'study'] },
      { en: 'Why does he need a doctor?', hi: 'उसे डॉक्टर की ज़रूरत क्यों है?', words: ['Why', 'does', 'he', 'need', 'a', 'doctor'] },
      { en: 'Why does she need rest?', hi: 'उसे आराम की ज़रूरत क्यों है?', words: ['Why', 'does', 'she', 'need', 'rest'] },
      { en: 'How much time do we need?', hi: 'हमें कितना समय चाहिए?', words: ['How', 'much', 'time', 'do', 'we', 'need'] },
      { en: 'How much money do they need?', hi: 'उन्हें कितने पैसे चाहिए?', words: ['How', 'much', 'money', 'do', 'they', 'need'] },
      { en: 'Why do I need to sleep?', hi: 'मुझे सोने की ज़रूरत क्यों है?', words: ['Why', 'do', 'I', 'need', 'to', 'sleep'] },
      { en: 'Why do you need to exercise?', hi: 'तुम्हें व्यायाम क्यों करना है?', words: ['Why', 'do', 'you', 'need', 'to', 'exercise'] },
      { en: 'What kind of phone does he need?', hi: 'उसे कैसा फ़ोन चाहिए?', words: ['What', 'kind', 'of', 'phone', 'does', 'he', 'need'] },
      { en: 'What does she need to improve?', hi: 'उसे क्या सुधारना है?', words: ['What', 'does', 'she', 'need', 'to', 'improve'] }
    ]
  }
};
