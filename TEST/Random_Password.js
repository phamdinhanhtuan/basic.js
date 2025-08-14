function generatePassword(length, useUpper, useLower, useNumber, useSymbol) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const symbol = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  let chars = '';
  if (useUpper) chars += upper;
  if (useLower) chars += lower;
  if (useNumber) chars += number;
  if (useSymbol) chars += symbol;

  if (!chars) {
    console.log('Bạn phải chọn ít nhất một loại ký tự!');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Ví dụ sử dụng:
const length = 12;
const useUpper = true;
const useLower = true;
const useNumber = true;
const useSymbol = true;

const password = generatePassword(length, useUpper, useLower, useNumber, useSymbol);
console.log('Mật khẩu ngẫu nhiên:', password);
