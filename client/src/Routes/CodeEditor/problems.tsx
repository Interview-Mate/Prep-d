export const problem1 = {
  name: 'Simple Addition',
  description:
    'Write a function that takes two numbers as arguments and returns the sum.',
  hint: 'You can use addition.',
  function: 'function add(a, b) {\n\n  //Insert your code \n\n};',
  solution1: ['add(1, 1);', 2],
  solution2: ['add(2, 8);', 10],
  language: 'javascript',
  level: 1,
};

export const problem2 = {
  name: 'Reverse String',
  description:
    'Write a function that reverses a string and returns the reversed string.',
  hint: 'You can split an string into an array.',
  function: 'function reverseString(str) {\n\n  //Insert your code \n\n};',
  solution1: ['reverseString("hello");', 'olleh'],
  solution2: ['reverseString("world");', 'dlrow'],
  language: 'javascript',
  level: 1,
};

export const problem3 = {
  name: 'N-Queens',
  description:
    'Write a function that returns the number of distinct solutions to the n-queens problem.',
  hint: 'You can use recursion.',
  function: 'function solveNQueens(n) {\n\n  //Insert your code \n\n};',
  solution1: ['solveNQueens(4);', 2],
  solution2: ['solveNQueens(8);', 92],
  language: 'javascript',
  level: 4,
};

export const problem4 = {
  name: 'Palindrome Checker',
  description:
    'Write a function that takes a string as an argument and returns true if the string is a palindrome (reads the same backwards as forwards), otherwise returns false.',
  hint: 'You can use the reverse method.',
  function: 'function isPalindrome(str) {\n\n //Insert your code \n\n};',
  solution1: ['isPalindrome("racecar");', true],
  solution2: ['isPalindrome("hello");', false],
  language: 'javascript',
  level: 2,
};

export const problem5 = {
  name: 'FizzBuzz',
  description:
    'Write a function that takes a number as an argument and returns "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, "FizzBuzz" if the number is divisible by both 3 and 5, and the number itself if it is not divisible by either 3 or 5.',
  hint: 'You can use the modulo operator.',
  function: 'function fizzBuzz(num) {\n\n //Insert your code \n\n};',
  solution1: ['fizzBuzz(9);', 'Fizz'],
  solution2: ['fizzBuzz(10);', 'Buzz'],
  language: 'javascript',
  level: 1,
};

export const problem6 = {
  name: 'Merge Sort',
  description:
    'Write a function that takes an array of integers as an argument and returns a new array with the integers sorted in ascending order using the merge sort algorithm.',
  hint: 'You can use recursion.',
  function: 'function mergeSort(arr) {\n\n //Insert your code \n\n};',
  solution1: ['mergeSort([5, 2, 9, 1, 5]);', [1, 2, 5, 5, 9]],
  solution2: ['mergeSort([10, 3, 8, 6, 4]);', [3, 4, 6, 8, 10]],
  language: 'javascript',
  level: 3,
};

export const problem7 = {
  name: 'Find Maximum Number',
  description:
    'Write a function that takes an array of numbers as an argument and returns the maximum number.',
  hint: 'You can use a Math. method.',
  function: 'function findMax(nums) {\n\n //Insert your code \n\n};',
  solution1: ['findMax([3, 7, 1, 9, 4]);', 9],
  solution2: ['findMax([12, 0, 5, 18, 2]);', 18],
  language: 'javascript',
  level: 2,
};
