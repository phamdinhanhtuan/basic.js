let alarmTime = null;
let alarmTimeout = null;

function updateCurrentTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('vi-VN');
  document.getElementById('current-time').textContent = 'Bây giờ: ' + timeStr;
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime();

function setAlarm() {
  const input = document.getElementById('alarm-time').value;
  if (!input) {
    alert('Vui lòng chọn giờ báo thức!');
    return;
  }
  const [hour, minute] = input.split(':').map(Number);
  const now = new Date();
  let alarm = new Date();
  alarm.setHours(hour, minute, 0, 0);

  // Nếu giờ báo thức đã qua hôm nay, đặt cho ngày mai
  if (alarm <= now) {
    alarm.setDate(alarm.getDate() + 1);
  }

  const timeToAlarm = alarm - now;
  if (alarmTimeout) clearTimeout(alarmTimeout);

  alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
  alarmTime = input;
  document.getElementById('alarm-status').textContent = 'Đã đặt báo thức lúc: ' + input;
}

function triggerAlarm() {
  document.getElementById('alarm-status').textContent = 'Đến giờ báo thức!';
  const audio = document.getElementById('alarm-audio');
  audio.play();
  alert('Đến giờ báo thức!');
  alarmTime = null;
}
