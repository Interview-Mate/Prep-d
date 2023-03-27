import Exercise from "../models/exercise"
//WARN:
// This function populatex the "exercises" collection in the database.
// It needs to be executed only once before starting interacting with that collection.
// It should not be imported in server/index.ts
// In order to execute it:
//  - run "tsc" in the terminal
//  - go to server/dist/seedScript.js
//  - execute the file by clicking on the arrow button (top right)

async function populateExerciseCollection () {
  try {
    await Exercise.deleteMany({});
    await Exercise.insertMany([{
      name: 'Simple Addition',
      description:
        'Write a function that takes two numbers as arguments and returns the sum.',
      hint: 'You can use addition.',
      function: 'function add(a, b) {\n\n  //Insert your code \n\n};',
      solution1: ['add(1, 1);', 2],
      solution2: ['add(2, 8);', 10],
      solution3: ['add(44, 3);', 47],
      language: 'javascript',
      level: 1,
    },
      {
      name: 'Reverse String',
      description:
        'Write a function that reverses a string and returns the reversed string.',
      hint: 'You can split an string into an array.',
      function: 'function reverseString(str) {\n\n  //Insert your code \n\n};',
      solution1: ['reverseString(“hello”);', 'olleh'],
      solution2: ['reverseString(“world”);', 'dlrow'],
      solution3: ['reverseString(“Codeworks”);', 'skrowedoC'],
      language: 'javascript',
      level: 1,
    },
    {
      name: 'Palindrome Checker',
      description:
        'Write a function that takes a string as an argument and returns true if the string is a palindrome (reads the same backwards as forwards), otherwise returns false.',
      hint: 'You can use the reverse method.',
      function: 'function isPalindrome(str) {\n\n //Insert your code \n\n};',
      solution1: ['isPalindrome(“racecar”);', true],
      solution2: ['isPalindrome(“hello”);', false],
      solution3: ['isPalindrome(“anna”);', true],
      language: 'javascript',
      level: 2,
    },
      {
      name: 'N-Queens',
      description:
        'Write a function that returns the number of distinct solutions to the n-queens problem.',
      hint: 'You can use recursion.',
      function: 'function solveNQueens(n) {\n\n  //Insert your code \n\n};',
      solution1: ['solveNQueens(4);', 2],
      solution2: ['solveNQueens(8);', 92],
      solution3: ['solveNQueens(5);', 10],
      language: 'javascript',
      level: 4,
    },
      {
      name: 'FizzBuzz',
      description:
        'Write a function that takes a number as an argument and returns “Fizz” if the number is divisible by 3, “Buzz” if the number is divisible by 5, “FizzBuzz” if the number is divisible by both 3 and 5, and the number itself if it is not divisible by either 3 or 5.',
      hint: 'You can use the modulo operator.',
      function: 'function fizzBuzz(num) {\n\n //Insert your code \n\n};',
      solution1: ['fizzBuzz(9);', 'Fizz'],
      solution2: ['fizzBuzz(10);', 'Buzz'],
      solution3: ['fizzBuzz(15);', 'FizzBuzz'],
      language: 'javascript',
      level: 1,
    },
      {
      name: 'Merge Sort',
      description:
        'Write a function that takes an array of integers as an argument and returns a new array with the integers sorted in ascending order using the merge sort algorithm.',
      hint: 'You can use recursion.',
      function: 'function mergeSort(arr) {\n\n //Insert your code \n\n};',
      solution1: ['mergeSort([5, 2, 9, 1, 5]);', [1, 2, 5, 5, 9]],
      solution2: ['mergeSort([10, 3, 8, 6, 4]);', [3, 4, 6, 8, 10]],
      solution3: ['mergeSort([1, 2, 3, 4, 5]);', [1, 2, 3, 4, 5]],
      language: 'javascript',
      level: 3,
    },
      {
      name: 'Find Maximum Number',
      description:
        'Write a function that takes an array of numbers as an argument and returns the maximum number.',
      hint: 'You can use a Math. method.',
      function: 'function findMax(nums) {\n\n //Insert your code \n\n};',
      solution1: ['findMax([3, 7, 1, 9, 4]);', 9],
      solution2: ['findMax([12, 0, 5, 18, 2]);', 18],
      solution3: ['findMax([1, 2, 3, 4, 5]);', 5],
      language: 'javascript',
      level: 2,
    }])
  } catch (err) {
    console.error(err);
  }
console.log('Collection populated!');
 };

 export default populateExerciseCollection;






