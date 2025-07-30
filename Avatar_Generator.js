// Ứng dụng tạo avatar ngẫu nhiên
// Sử dụng Dicebear API để tạo avatar với các thành phần khác nhau

const readline = require('readline');

class AvatarGenerator {
  constructor() {
    this.avatarStyles = [
      'adventurer',
      'adventurer-neutral',
      'avataaars',
      'big-ears',
      'big-smile',
      'bottts',
      'croodles',
      'croodles-neutral',
      'identicon',
      'initials',
      'micah',
      'miniavs',
      'personas'
    ];
    
    this.currentStyle = 'adventurer';
    this.currentSeed = this.generateRandomSeed();
  }

  // Tạo seed ngẫu nhiên
  generateRandomSeed() {
    const adjectives = ['happy', 'brave', 'clever', 'wise', 'kind', 'strong', 'gentle', 'bright', 'calm', 'wild'];
    const nouns = ['cat', 'dog', 'bird', 'fish', 'lion', 'tiger', 'bear', 'wolf', 'eagle', 'dragon'];
    const randomNum = Math.floor(Math.random() * 1000);
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective}${randomNoun}${randomNum}`;
  }

  // Tạo URL avatar từ Dicebear API
  generateAvatarUrl(style = this.currentStyle, seed = this.currentSeed, options = {}) {
    const baseUrl = 'https://api.dicebear.com/7.x';
    const defaultOptions = {
      backgroundColor: 'b6e3f4',
      radius: 50,
      size: 200
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    const queryParams = new URLSearchParams(mergedOptions);
    
    return `${baseUrl}/${style}/svg?seed=${seed}&${queryParams.toString()}`;
  }

  // Tạo avatar mới với style và seed ngẫu nhiên
  generateRandomAvatar() {
    this.currentStyle = this.avatarStyles[Math.floor(Math.random() * this.avatarStyles.length)];
    this.currentSeed = this.generateRandomSeed();
    
    return {
      style: this.currentStyle,
      seed: this.currentSeed,
      url: this.generateAvatarUrl()
    };
  }

  // Tạo avatar với style cụ thể
  generateAvatarWithStyle(style) {
    if (!this.avatarStyles.includes(style)) {
      throw new Error(`Style "${style}" không hợp lệ. Các style có sẵn: ${this.avatarStyles.join(', ')}`);
    }
    
    this.currentStyle = style;
    this.currentSeed = this.generateRandomSeed();
    
    return {
      style: this.currentStyle,
      seed: this.currentSeed,
      url: this.generateAvatarUrl()
    };
  }

  // Tạo avatar với seed cụ thể
  generateAvatarWithSeed(seed) {
    this.currentSeed = seed;
    
    return {
      style: this.currentStyle,
      seed: this.currentSeed,
      url: this.generateAvatarUrl()
    };
  }

  // Tạo avatar với tùy chọn tùy chỉnh
  generateCustomAvatar(style, seed, options = {}) {
    if (style && !this.avatarStyles.includes(style)) {
      throw new Error(`Style "${style}" không hợp lệ. Các style có sẵn: ${this.avatarStyles.join(', ')}`);
    }
    
    const finalStyle = style || this.currentStyle;
    const finalSeed = seed || this.generateRandomSeed();
    
    return {
      style: finalStyle,
      seed: finalSeed,
      url: this.generateAvatarUrl(finalStyle, finalSeed, options)
    };
  }

  // Hiển thị danh sách các style có sẵn
  listAvailableStyles() {
    console.log('\n--- Các style avatar có sẵn ---');
    this.avatarStyles.forEach((style, index) => {
      console.log(`${index + 1}. ${style}`);
    });
  }

  // Hiển thị thông tin avatar
  displayAvatarInfo(avatar) {
    console.log('\n--- Thông tin Avatar ---');
    console.log(`Style: ${avatar.style}`);
    console.log(`Seed: ${avatar.seed}`);
    console.log(`URL: ${avatar.url}`);
    console.log('\nĐể xem avatar, hãy mở URL trên trong trình duyệt web.');
  }
}

// Demo sử dụng
console.log('=== ỨNG DỤNG TẠO AVATAR NGẪU NHIÊN ===\n');

const generator = new AvatarGenerator();

// Demo 1: Tạo avatar ngẫu nhiên
console.log('1. Tạo avatar ngẫu nhiên:');
const randomAvatar = generator.generateRandomAvatar();
generator.displayAvatarInfo(randomAvatar);

// Demo 2: Tạo avatar với style cụ thể
console.log('\n2. Tạo avatar với style "avataaars":');
try {
  const avataaarsAvatar = generator.generateAvatarWithStyle('avataaars');
  generator.displayAvatarInfo(avataaarsAvatar);
} catch (e) {
  console.error(e.message);
}

// Demo 3: Tạo avatar với seed cụ thể
console.log('\n3. Tạo avatar với seed "myCustomAvatar":');
const customSeedAvatar = generator.generateAvatarWithSeed('myCustomAvatar');
generator.displayAvatarInfo(customSeedAvatar);

// Demo 4: Tạo avatar tùy chỉnh
console.log('\n4. Tạo avatar tùy chỉnh:');
try {
  const customAvatar = generator.generateCustomAvatar('bottts', 'robot123', {
    backgroundColor: 'ff6b6b',
    radius: 25
  });
  generator.displayAvatarInfo(customAvatar);
} catch (e) {
  console.error(e.message);
}

// Hiển thị danh sách styles
generator.listAvailableStyles();

// Tạo giao diện tương tác
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n=== MENU TẠO AVATAR ===');
  console.log('1. Tạo avatar ngẫu nhiên');
  console.log('2. Tạo avatar với style cụ thể');
  console.log('3. Tạo avatar với seed tùy chỉnh');
  console.log('4. Tạo avatar tùy chỉnh hoàn toàn');
  console.log('5. Hiển thị danh sách styles');
  console.log('0. Thoát');
  rl.question('\nChọn chức năng: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      const random = generator.generateRandomAvatar();
      generator.displayAvatarInfo(random);
      showMenu();
      break;
      
    case '2':
      generator.listAvailableStyles();
      rl.question('Nhập tên style: ', (style) => {
        try {
          const avatar = generator.generateAvatarWithStyle(style);
          generator.displayAvatarInfo(avatar);
        } catch (e) {
          console.error(e.message);
        }
        showMenu();
      });
      break;
      
    case '3':
      rl.question('Nhập seed tùy chỉnh: ', (seed) => {
        const avatar = generator.generateAvatarWithSeed(seed);
        generator.displayAvatarInfo(avatar);
        showMenu();
      });
      break;
      
    case '4':
      generator.listAvailableStyles();
      rl.question('Nhập style (hoặc Enter để dùng style hiện tại): ', (style) => {
        rl.question('Nhập seed (hoặc Enter để tạo ngẫu nhiên): ', (seed) => {
          rl.question('Nhập màu nền (hex, ví dụ: ff6b6b): ', (bgColor) => {
            const options = {};
            if (bgColor) options.backgroundColor = bgColor;
            
            try {
              const avatar = generator.generateCustomAvatar(
                style || undefined,
                seed || undefined,
                options
              );
              generator.displayAvatarInfo(avatar);
            } catch (e) {
              console.error(e.message);
            }
            showMenu();
          });
        });
      });
      break;
      
    case '5':
      generator.listAvailableStyles();
      showMenu();
      break;
      
    case '0':
      console.log('Cảm ơn bạn đã sử dụng ứng dụng tạo avatar!');
      rl.close();
      break;
      
    default:
      console.log('Lựa chọn không hợp lệ.');
      showMenu();
  }
}

rl.on('close', () => {
  console.log('Đã thoát chương trình.');
  process.exit(0);
});

// Bỏ comment dòng sau để chạy giao diện tương tác
// showMenu();

// Hàm tiện ích để tạo nhiều avatar cùng lúc
function generateMultipleAvatars(count = 5) {
  console.log(`\n=== TẠO ${count} AVATAR NGẪU NHIÊN ===`);
  
  for (let i = 1; i <= count; i++) {
    const avatar = generator.generateRandomAvatar();
    console.log(`\nAvatar ${i}:`);
    console.log(`Style: ${avatar.style}`);
    console.log(`Seed: ${avatar.seed}`);
    console.log(`URL: ${avatar.url}`);
  }
}

// Demo tạo nhiều avatar
console.log('\n5. Tạo 3 avatar ngẫu nhiên:');
generateMultipleAvatars(3);

console.log('\n=== HƯỚNG DẪN SỬ DỤNG ===');
console.log('- Để xem avatar, copy URL và mở trong trình duyệt web');
console.log('- Mỗi seed sẽ tạo ra một avatar nhất quán');
console.log('- Cùng một seed với cùng style sẽ tạo ra avatar giống nhau');
console.log('- Thay đổi style sẽ tạo ra phong cách avatar khác nhau');
console.log('- API Dicebear hoàn toàn miễn phí và không cần đăng ký');
