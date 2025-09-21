export interface ChallengeQuestion {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  buggyCode: string;
  correctAnswer: string;
  explanation: string;
  output: string;
}

export const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 1,
    title: "Sum of First 10 Numbers",
    description: "Fix the code so it prints the sum of the first 10 natural numbers.",
    difficulty: "Easy",
    buggyCode: `total = 0
for i in range(1, 10):
    total = total + i
print("Sum =", total)`,
    correctAnswer: `total = 0
for i in range(1, 11):
    total = total + i
print("Sum =", total)`,
    explanation: "The range should go up to 11 to include 10 in the sum.",
    output: `Sum = 55`
  },
  {
    id: 2,
    title: "Factorial of 5",
    description: "Fix the code so it prints the factorial of 5.",
    difficulty: "Easy",
    buggyCode: `n = 5
fact = 1
for i in range(1, n):
    fact *= i
print("Factorial:", fact)`,
    correctAnswer: `n = 5
fact = 1
for i in range(1, n+1):
    fact *= i
print("Factorial:", fact)`,
    explanation: "The range should go up to n+1 to include n in the multiplication.",
    output: `Factorial: 120`
  },
  {
    id: 3,
    title: "Palindrome Check",
    description: "Fix the code so it checks if the word is a palindrome.",
    difficulty: "Easy",
    buggyCode: `word = "madam"
if word == word.reverse():
    print("Palindrome")
else:
    print("Not Palindrome")`,
    correctAnswer: `word = "madam"
if word == word[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")`,
    explanation: "Strings do not have a reverse() method. Use slicing [::-1] to reverse a string.",
    output: `Palindrome`
  },
  {
    id: 4,
    title: "Fibonacci Series (First 7 terms)",
    description: "Fix the code so it prints the first 7 terms of the Fibonacci series.",
    difficulty: "Easy",
    buggyCode: `n = 7
a, b = 0, 0
for i in range(n):
    print(a, end=" ")
    a, b = b, a+b`,
    correctAnswer: `n = 7
a, b = 0, 1
for i in range(n):
    print(a, end=" ")
    a, b = b, a+b`,
    explanation: "The second value should start at 1, not 0.",
    output: `0 1 1 2 3 5 8 `
  },
  {
    id: 5,
    title: "Largest Number in List",
    description: "Fix the code so it finds the largest number in the list.",
    difficulty: "Easy",
    buggyCode: `numbers = [2, 8, 5, 1, 9]
largest = 0
for x in numbers:
    if x > largest:
        largest = x
print("Largest:", largest)`,
    correctAnswer: `numbers = [2, 8, 5, 1, 9]
largest = numbers[0]
for x in numbers:
    if x > largest:
        largest = x
print("Largest:", largest)`,
    explanation: "Initialize 'largest' with the first element of the list, not 0.",
    output: `Largest: 9`
  },
  {
    id: 6,
    title: "Even / Odd Check",
    description: "Fix the code so it checks if a number is even or odd.",
    difficulty: "Easy",
    buggyCode: `num = 15
if num % 2 = 0:
    print("Even")
else:
    print("Odd")`,
    correctAnswer: `num = 15
if num % 2 == 0:
    print("Even")
else:
    print("Odd")`,
    explanation: "Use '==' for comparison, not '=' which is assignment.",
    output: `Odd`
  },
  {
    id: 7,
    title: "Prime Number Check (for n = 13)",
    description: "Fix the code so it correctly checks if 13 is a prime number.",
    difficulty: "Easy",
    buggyCode: `n = 13
for i in range(2, n//2):
    if n % i == 0:
        print("Not Prime")
        break
else:
    print("Prime")`,
    correctAnswer: `n = 13
for i in range(2, (n//2) + 1):
    if n % i == 0:
        print("Not Prime")
        break
else:
    print("Prime")`,
    explanation: "The range should include n//2, so use (n//2) + 1.",
    output: `Prime`
  },
  {
    id: 8,
    title: "Access Dictionary Key",
    description: "Fix the code so it accesses the correct key in the dictionary.",
    difficulty: "Easy",
    buggyCode: `student = {"name": "Rahul", "age": 20}
print(student["class"])`,
    correctAnswer: `student = {"name": "Rahul", "age": 20}
print(student["name"])`,
    explanation: "The key 'class' does not exist. Use an existing key like 'name'.",
    output: `Rahul`
  },
  {
    id: 9,
    title: "Reverse a List",
    description: "Fix the code so it prints the reversed list.",
    difficulty: "Easy",
    buggyCode: `lst = [1, 2, 3, 4, 5]
rev = lst.reverse()
print(rev)`,
    correctAnswer: `lst = [1, 2, 3, 4, 5]
lst.reverse()
print(lst)`,
    explanation: "The reverse() method reverses the list in place and returns None.",
    output: `[5, 4, 3, 2, 1]`
  },
  {
    id: 10,
    title: "Convert to Uppercase",
    description: "Fix the code so it prints the text in uppercase.",
    difficulty: "Easy",
    buggyCode: `text = "python"
print(text.uppercase())`,
    correctAnswer: `text = "python"
print(text.upper())`,
    explanation: "The correct method is upper(), not uppercase().",
    output: `PYTHON`
  },
  {
    id: 11,
    title: "Find Average of Marks",
    description: "Fix the code so it prints the correct average of marks.",
    difficulty: "Easy",
    buggyCode: `marks = [45, 55, 65, 75]
avg = sum(marks) / len(marks) - 1
print("Average:", avg)`,
    correctAnswer: `marks = [45, 55, 65, 75]
avg = sum(marks) / len(marks)
print("Average:", avg)`,
    explanation: "Do not subtract 1 from the average calculation.",
    output: `Average: 60.0`
  },
  {
    id: 12,
    title: "Count Vowels in String",
    description: "Fix the code so it counts the number of vowels in the string.",
    difficulty: "Easy",
    buggyCode: `text = "education"
count = 0
for ch in text:
    if ch in ["a", "e", "i", "o", "u"]:
        count = count + 1
print("Vowels:", countt)`,
    correctAnswer: `text = "education"
count = 0
for ch in text:
    if ch in ["a", "e", "i", "o", "u"]:
        count = count + 1
print("Vowels:", count)`,
    explanation: "The variable name should be 'count', not 'countt'.",
    output: `Vowels: 5`
  },
  {
    id: 13,
    title: "Multiplication Table of 5",
    description: "Fix the code so it prints the multiplication table of 5 up to 10.",
    difficulty: "Easy",
    buggyCode: `n = 5
for i in range(1, 10):
    print(n, "x", i, "=", n*i)`,
    correctAnswer: `n = 5
for i in range(1, 11):
    print(n, "x", i, "=", n*i)`,
    explanation: "The range should go up to 11 to include 10 in the table.",
    output: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`
  }
];
