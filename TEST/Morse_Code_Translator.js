// Ứng dụng Morse Code Translator
// Chuyển đổi văn bản sang mã Morse và ngược lại
// Có tính năng phát âm thanh mã Morse

const readline = require('readline');

// 1. Định nghĩa bảng mã Morse
const MORSE_CODE = {
  // Chữ cái
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  
  // Số
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  
  // Dấu câu và ký tự đặc biệt
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ' ': ' ',
  '-': '-....-', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

// Bảng đảo ngược để chuyển từ Morse sang text
const REVERSE_MORSE = {};
for (const [key, value] of Object.entries(MORSE_CODE)) {
  REVERSE_MORSE[value] = key;
}

// 2. Class Morse Translator
class MorseTranslator {
  constructor() {
    this.audioContext = null;
    this.oscillator = null;
    this.gainNode = null;
  }

  // Chuyển văn bản sang mã Morse
  textToMorse(text) {
    if (!text || text.trim() === '') {
      throw new Error('Văn bản không được để trống.');
    }

    const upperText = text.toUpperCase();
    let morseResult = '';
    
    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      if (MORSE_CODE[char]) {
        morseResult += MORSE_CODE[char];
        // Thêm khoảng cách giữa các ký tự (trừ khoảng trắng)
        if (char !== ' ' && i < upperText.length - 1 && upperText[i + 1] !== ' ') {
          morseResult += ' ';
        }
      } else {
        throw new Error(`Ký tự không được hỗ trợ: ${char}`);
      }
    }
    
    return morseResult.trim();
  }

  // Chuyển mã Morse sang văn bản
  morseToText(morse) {
    if (!morse || morse.trim() === '') {
      throw new Error('Mã Morse không được để trống.');
    }

    const morseWords = morse.split('   '); // 3 khoảng cách = từ mới
    let textResult = '';
    
    for (let i = 0; i < morseWords.length; i++) {
      const morseChars = morseWords[i].split(' '); // 1 khoảng cách = ký tự mới
      
      for (let j = 0; j < morseChars.length; j++) {
        const morseChar = morseChars[j];
        if (morseChar === '') continue; // Bỏ qua khoảng trắng thừa
        
        if (REVERSE_MORSE[morseChar]) {
          textResult += REVERSE_MORSE[morseChar];
        } else {
          throw new Error(`Mã Morse không hợp lệ: ${morseChar}`);
        }
      }
      
      // Thêm khoảng cách giữa các từ (trừ từ cuối)
      if (i < morseWords.length - 1) {
        textResult += ' ';
      }
    }
    
    return textResult;
  }

  // Khởi tạo Web Audio API (cho trình duyệt)
  initAudio() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.oscillator = this.audioContext.createOscillator();
      this.gainNode = this.audioContext.createGain();
      
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      this.oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      this.oscillator.type = 'sine';
    }
  }

  // Phát âm thanh cho một ký tự Morse
  async playMorseChar(morseChar, duration = 100) {
    if (!this.audioContext) {
      console.log('Audio không khả dụng trong môi trường này.');
      return;
    }

    return new Promise((resolve) => {
      const startTime = this.audioContext.currentTime;
      
      // Phát âm thanh
      this.gainNode.gain.setValueAtTime(0, startTime);
      this.gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      this.gainNode.gain.linearRampToValueAtTime(0, startTime + duration / 1000);
      
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  // Phát âm thanh cho toàn bộ mã Morse
  async playMorseAudio(morseText) {
    if (!this.audioContext) {
      console.log('Audio không khả dụng trong môi trường này.');
      return;
    }

    console.log('🎵 Đang phát âm thanh mã Morse...');
    
    for (let i = 0; i < morseText.length; i++) {
      const char = morseText[i];
      
      if (char === '.') {
        await this.playMorseChar('.', 100);
        await this.delay(100);
      } else if (char === '-') {
        await this.playMorseChar('-', 300);
        await this.delay(100);
      } else if (char === ' ') {
        await this.delay(200);
      }
    }
    
    console.log('✅ Hoàn thành phát âm thanh.');
  }

  // Hàm delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Hiển thị bảng mã Morse
  showMorseTable() {
    console.log('\n📋 BẢNG MÃ MORSE');
    console.log('─'.repeat(80));
    console.log('CHỮ CÁI:');
    
    const letters = Object.keys(MORSE_CODE).filter(key => /^[A-Z]$/.test(key));
    for (let i = 0; i < letters.length; i += 5) {
      const row = letters.slice(i, i + 5).map(letter => 
        `${letter}: ${MORSE_CODE[letter].padEnd(6)}`
      ).join('  ');
      console.log(row);
    }
    
    console.log('\nSỐ:');
    const numbers = Object.keys(MORSE_CODE).filter(key => /^[0-9]$/.test(key));
    for (let i = 0; i < numbers.length; i += 5) {
      const row = numbers.slice(i, i + 5).map(num => 
        `${num}: ${MORSE_CODE[num].padEnd(6)}`
      ).join('  ');
      console.log(row);
    }
    
    console.log('\nDẤU CÂU:');
    const punctuation = Object.keys(MORSE_CODE).filter(key => 
      /^[.,?!\-/()&:;=+_"$@]$/.test(key)
    );
    for (let i = 0; i < punctuation.length; i += 3) {
      const row = punctuation.slice(i, i + 3).map(punct => 
        `${punct}: ${MORSE_CODE[punct].padEnd(8)}`
      ).join('  ');
      console.log(row);
    }
    console.log('─'.repeat(80));
  }

  // Kiểm tra tính hợp lệ của mã Morse
  validateMorse(morse) {
    const validChars = /^[.\-\s]+$/;
    return validChars.test(morse);
  }

  // Hướng dẫn sử dụng
  showInstructions() {
    console.log('\n📖 HƯỚNG DẪN SỬ DỤNG:');
    console.log('• Chuyển văn bản sang Morse: Nhập văn bản bình thường');
    console.log('• Chuyển Morse sang văn bản: Sử dụng . cho dot, - cho dash');
    console.log('• Khoảng cách giữa các ký tự: 1 space');
    console.log('• Khoảng cách giữa các từ: 3 spaces');
    console.log('• Ví dụ: "HELLO WORLD" → ".... . .-.. .-.. ---   .-- --- .-. .-.. -.."');
    console.log('• Ví dụ: ".... . .-.. .-.. ---" → "HELLO"');
  }
}

// 3. Khởi tạo ứng dụng
const translator = new MorseTranslator();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n📡 MORSE CODE TRANSLATOR 📡');
  console.log('1. Văn bản → Mã Morse');
  console.log('2. Mã Morse → Văn bản');
  console.log('3. Hiển thị bảng mã Morse');
  console.log('4. Hướng dẫn sử dụng');
  console.log('5. Phát âm thanh mã Morse');
  console.log('0. Thoát');
  rl.question('Chọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      textToMorseFlow();
      break;
    case '2':
      morseToTextFlow();
      break;
    case '3':
      translator.showMorseTable();
      showMenu();
      break;
    case '4':
      translator.showInstructions();
      showMenu();
      break;
    case '5':
      playMorseFlow();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('❌ Lựa chọn không hợp lệ.');
      showMenu();
  }
}

function textToMorseFlow() {
  rl.question('Nhập văn bản cần chuyển đổi: ', (text) => {
    try {
      const morse = translator.textToMorse(text);
      console.log('\n📤 KẾT QUẢ:');
      console.log(`Văn bản: "${text}"`);
      console.log(`Mã Morse: "${morse}"`);
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function morseToTextFlow() {
  rl.question('Nhập mã Morse cần chuyển đổi: ', (morse) => {
    try {
      if (!translator.validateMorse(morse)) {
        console.error('❌ Mã Morse chỉ được chứa các ký tự: . - và khoảng trắng');
        showMenu();
        return;
      }
      
      const text = translator.morseToText(morse);
      console.log('\n📥 KẾT QUẢ:');
      console.log(`Mã Morse: "${morse}"`);
      console.log(`Văn bản: "${text}"`);
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

function playMorseFlow() {
  rl.question('Nhập mã Morse để phát âm thanh: ', async (morse) => {
    try {
      if (!translator.validateMorse(morse)) {
        console.error('❌ Mã Morse chỉ được chứa các ký tự: . - và khoảng trắng');
        showMenu();
        return;
      }
      
      console.log('🎵 Khởi tạo audio...');
      translator.initAudio();
      
      // Đợi một chút để audio context khởi tạo
      await translator.delay(100);
      
      await translator.playMorseAudio(morse);
    } catch (e) {
      console.error('❌ Lỗi:', e.message);
    }
    showMenu();
  });
}

// Xử lý thoát chương trình
rl.on('close', () => {
  console.log('\n👋 Cảm ơn bạn đã sử dụng Morse Code Translator!');
  process.exit(0);
});

// Demo tự động
console.log('🚀 Khởi động Morse Code Translator...\n');

// Thêm một số ví dụ demo
try {
  console.log('📝 VÍ DỤ DEMO:');
  console.log('"HELLO" →', translator.textToMorse('HELLO'));
  console.log('"WORLD" →', translator.textToMorse('WORLD'));
  console.log('"123" →', translator.textToMorse('123'));
  console.log('"HELLO WORLD" →', translator.textToMorse('HELLO WORLD'));
  
  console.log('\n🔄 CHUYỂN ĐỔI NGƯỢC:');
  console.log('".... . .-.. .-.. ---" →', translator.morseToText('.... . .-.. .-.. ---'));
  console.log('".-- --- .-. .-.. -.." →', translator.morseToText('.-- --- .-. .-.. -..'));
  console.log('"..--- ...-- ....-" →', translator.morseToText('..--- ...-- ....-'));
} catch (e) {
  console.error('Demo error:', e.message);
}

// Bắt đầu menu chính
showMenu();
