export interface ChallengeQuestion {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  buggyCode: string;
  correctAnswer: string;
  explanation: string;
}

export const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 1,
    title: "Infinite Loop",
    description: "This function should count from 1 to 10, but it never stops. Fix the loop condition.",
    difficulty: "Easy",
    buggyCode: `def count_to_ten():\n    i = 1\n    while i <= 10:\n        print(i)\n        # Missing increment\n    print(\"Done!\")\n\ncount_to_ten()`,
    correctAnswer: `def count_to_ten():\n    i = 1\n    while i <= 10:\n        print(i)\n        i += 1\n    print(\"Done!\")\n\ncount_to_ten()`,
    explanation: "The loop variable 'i' was never incremented, causing an infinite loop."
  },
  {
    id: 2,
    title: "List Index Error",
    description: "This code tries to access list elements but fails. Fix the index issue.",
    difficulty: "Easy",
    buggyCode: `numbers = [1, 2, 3, 4, 5]\nfor i in range(6):\n    print(numbers[i])`,
    correctAnswer: `numbers = [1, 2, 3, 4, 5]\nfor i in range(5):\n    print(numbers[i])`,
    explanation: "The range was 6 but the list only has 5 elements (indices 0-4)."
  },
  {
    id: 3,
    title: "String Concatenation",
    description: "This code should combine a string and number, but throws an error.",
    difficulty: "Easy",
    buggyCode: `name = \"Alice\"\nage = 25\nmessage = \"Hello \" + name + \", you are \" + age + \" years old\"\nprint(message)`,
    correctAnswer: `name = \"Alice\"\nage = 25\nmessage = \"Hello \" + name + \", you are \" + str(age) + \" years old\"\nprint(message)`,
    explanation: "Cannot concatenate string and integer directly. Need to convert age to string."
  },
  {
    id: 4,
    title: "Dictionary KeyError",
    description: "This code tries to access a dictionary key that might not exist.",
    difficulty: "Easy",
    buggyCode: `student_grades = {\"Alice\": 85, \"Bob\": 92, \"Charlie\": 78}\nprint(student_grades[\"David\"])`,
    correctAnswer: `student_grades = {\"Alice\": 85, \"Bob\": 92, \"Charlie\": 78}\nprint(student_grades.get(\"David\", \"Student not found\"))`,
    explanation: "Use .get() method with a default value to safely access dictionary keys."
  },
  {
    id: 5,
    title: "Function Return",
    description: "This function should return the maximum of two numbers but doesn't work.",
    difficulty: "Easy",
    buggyCode: `def max_number(a, b):\n    if a > b:\n        a\n    else:\n        b\n\nresult = max_number(5, 3)\nprint(result)`,
    correctAnswer: `def max_number(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nresult = max_number(5, 3)\nprint(result)`,
    explanation: "Missing 'return' keywords. Functions need to explicitly return values."
  },
  {
    id: 6,
    title: "String Formatting",
    description: "This code has incorrect string formatting that causes an error.",
    difficulty: "Easy",
    buggyCode: `name = \"John\"\nage = 30\nprint(\"My name is {name} and I am {age} years old\")`,
    correctAnswer: `name = \"John\"\nage = 30\nprint(f\"My name is {name} and I am {age} years old\")`,
    explanation: "Need 'f' before the string to use f-string formatting, or use .format() method."
  },
  {
    id: 7,
    title: "Boolean Logic Error",
    description: "This function should return True if a number is between 10 and 20, but the logic is wrong.",
    difficulty: "Easy",
    buggyCode: `def is_between_10_and_20(num):\n    return num > 10 or num < 20\n\nprint(is_between_10_and_20(5))   # Should be False\nprint(is_between_10_and_20(15))  # Should be True`,
    correctAnswer: `def is_between_10_and_20(num):\n    return num > 10 and num < 20\n\nprint(is_between_10_and_20(5))   # Should be False\nprint(is_between_10_and_20(15))  # Should be True`,
    explanation: "Should use 'and' not 'or' for checking if a number is within a range."
  },
  {
    id: 8,
    title: "Integer Division",
    description: "This code should perform integer division but gives float result in Python 3.",
    difficulty: "Easy",
    buggyCode: `def calculate_pages(total_items, items_per_page):\n    return total_items / items_per_page\n\npages = calculate_pages(25, 5)\nprint(f\"Number of pages: {pages}\")`,
    correctAnswer: `def calculate_pages(total_items, items_per_page):\n    return total_items // items_per_page\n\npages = calculate_pages(25, 5)\nprint(f\"Number of pages: {pages}\")`,
    explanation: "Use '//' for integer division instead of '/' which gives float result in Python 3."
  },
  {
    id: 9,
    title: "Set vs List",
    description: "This code should find unique elements but uses the wrong data structure.",
    difficulty: "Easy",
    buggyCode: `numbers = [1, 2, 2, 3, 3, 4, 4, 5]\nunique_numbers = []\nfor num in numbers:\n    if num not in unique_numbers:\n        unique_numbers.append(num)\nprint(unique_numbers)`,
    correctAnswer: `numbers = [1, 2, 2, 3, 3, 4, 4, 5]\nunique_numbers = list(set(numbers))\nprint(unique_numbers)`,
    explanation: "Using set() is more efficient for finding unique elements than manually checking a list."
  },
  {
    id: 10,
    title: "String Method Error",
    description: "This code tries to use a string method that doesn't exist.",
    difficulty: "Easy",
    buggyCode: `text = \"Hello World\"\nresult = text.reverse()\nprint(result)`,
    correctAnswer: `text = \"Hello World\"\nresult = text[::-1]\nprint(result)`,
    explanation: "Strings don't have a reverse() method. Use slicing [::-1] to reverse a string."
  },
  {
    id: 11,
    title: "Import Error",
    description: "This code tries to import a function incorrectly.",
    difficulty: "Easy",
    buggyCode: `import math\nresult = sqrt(16)\nprint(result)`,
    correctAnswer: `import math\nresult = math.sqrt(16)\nprint(result)`,
    explanation: "When using 'import math', access functions with 'math.sqrt()' or use 'from math import sqrt'."
  },
  {
    id: 12,
    title: "Tuple Assignment",
    description: "This code tries to modify a tuple element, which is not allowed.",
    difficulty: "Easy",
    buggyCode: `coordinates = (3, 4)\ncoordinates[0] = 5\nprint(coordinates)`,
    correctAnswer: `coordinates = [3, 4]  # Use list instead of tuple\ncoordinates[0] = 5\nprint(coordinates)`,
    explanation: "Tuples are immutable. Use a list if you need to modify elements."
  },
  {
    id: 13,
    title: "Type Comparison",
    description: "This code uses incorrect comparison operators for checking equality.",
    difficulty: "Easy",
    buggyCode: `def check_value(x):\n    if x = 10:\n        return \"Equal to 10\"\n    elif x > 10:\n        return \"Greater than 10\"\n    else:\n        return \"Less than 10\"\n\nresult = check_value(10)\nprint(result)`,
    correctAnswer: `def check_value(x):\n    if x == 10:\n        return \"Equal to 10\"\n    elif x > 10:\n        return \"Greater than 10\"\n    else:\n        return \"Less than 10\"\n\nresult = check_value(10)\nprint(result)`,
    explanation: "Use '==' for comparison, not '=' which is for assignment."
  }
];