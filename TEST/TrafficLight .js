class TrafficLight {
  constructor() {
    this.colors = ['red', 'yellow', 'green'];
    this.currentIndex = 0;
    this.durations = {
      red: 5000,    // 5 giây
      yellow: 2000, // 2 giây  
      green: 4000   // 4 giây
    };
    this.isRunning = false;
    this.interval = null;
  }

  start() {
    if (this.isRunning) {
      console.log('Đèn giao thông đang chạy rồi!');
      return;
    }
    
    this.isRunning = true;
    console.log('�� Bắt đầu mô phỏng đèn giao thông...');
    this.changeLight();
  }

  stop() {
    if (!this.isRunning) {
      console.log('Đèn giao thông chưa chạy!');
      return;
    }
    
    this.isRunning = false;
    clearTimeout(this.interval);
    console.log('🛑 Dừng mô phỏng đèn giao thông');
  }

  changeLight() {
    if (!this.isRunning) return;

    const currentColor = this.colors[this.currentIndex];
    const duration = this.durations[currentColor];
    
    // Hiển thị trạng thái đèn hiện tại
    this.displayLight(currentColor);
    
    // Chuyển sang đèn tiếp theo
    this.currentIndex = (this.currentIndex + 1) % this.colors.length;
    
    // Lập lịch chuyển đèn tiếp theo
    this.interval = setTimeout(() => {
      this.changeLight();
    }, duration);
  }

  displayLight(color) {
    const emoji = {
      red: '🔴',
      yellow: '🟡', 
      green: '🟢'
    };
    
    const messages = {
      red: 'ĐỎ - DỪNG LẠI!',
      yellow: 'VÀNG - CHUẨN BỊ!',
      green: 'XANH - ĐI ĐƯỢC!'
    };
    
    console.log(`${emoji[color]} ${messages[color]}`);
    console.log(`⏱️  Thời gian: ${this.durations[color]/1000} giây`);
    console.log('---');
  }
  setDuration(color, duration) {
    if (this.durations.hasOwnProperty(color)) {
      this.durations[color] = duration * 1000; // Chuyển từ giây sang milliseconds
      console.log(`Đã thay đổi thời gian đèn ${color}: ${duration} giây`);
    }
  }

  // Lấy trạng thái hiện tại
  getCurrentStatus() {
    return {
      color: this.colors[this.currentIndex],
      isRunning: this.isRunning
    };
  }
}

// Demo sử dụng
const trafficLight = new TrafficLight();

// Bắt đầu mô phỏng
trafficLight.start();

// Dừng sau 20 giây (để demo)
setTimeout(() => {
  trafficLight.stop();
}, 20000);

// Ví dụ thay đổi thời gian
// trafficLight.setDuration('red', 3);    // Đèn đỏ 3 giây
// trafficLight.setDuration('yellow', 1); // Đèn vàng 1 giây  
// trafficLight.setDuration('green', 5);  // Đèn xanh 5 giây
