const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

const checkPalindrom = (string = '') => {
  string = string.replaceAll(' ','').toLowerCase();
  const newString = string;
  let reversed = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    reversed += newString[i];
  }
  return string === reversed;
};

// Строка является палиндромом
checkPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrom('ДовОд'); // true
// Это не палиндром
checkPalindrom('Кекс'); // false
// Это палиндром
checkPalindrom('Лёша на полке клопа нашёл '); // true

const extractNumber = (string = '') => {
  string = string.toString();
  let number = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return(parseInt(number, 10));
};

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN

extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15

const isTimeInNumber = (string = '') => (parseInt(string.split(':')[0], 10) * 60) + parseInt(string.split(':')[1], 10);

const isValidTimeMetting = (startWorkTime, endWorkTime, startMeetingTime, meetingValues) => (isTimeInNumber(endWorkTime) - isTimeInNumber(startMeetingTime)) >= meetingValues && isTimeInNumber(startWorkTime) <= isTimeInNumber(startMeetingTime);

isValidTimeMetting('08:00', '17:30', '14:00', 90); // true
isValidTimeMetting('8:0', '10:0', '8:0', 120); // true
isValidTimeMetting('08:00', '14:30', '14:00', 90); // false
isValidTimeMetting('14:00', '17:30', '08:0', 90); // false
isValidTimeMetting('8:00', '17:30', '08:00', 900); // false
