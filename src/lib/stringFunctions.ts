export function capitalizeFirstLetter(word: string): string {
  if (word.length === 0) {
    return word; // Return the word as is if it's an empty string
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function validateEmail(email: string) {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export function validatePassword(password: string): boolean {
  const hasCapital = /[A-Z]/.test(password); // Check for at least one capital letter
  const hasLowercase = /[a-z]/.test(password); // Check for at least one lowercase letter
  const hasNumber = /[0-9]/.test(password); // Check for at least one number

  return hasCapital && hasLowercase && hasNumber;
}

export function containsOnlyNumbers(inputString: string): boolean {
  // Use a regular expression to check if the string contains only numbers
  const numberPattern: RegExp = /^[0-9]+$/;
  return numberPattern.test(inputString);
}
