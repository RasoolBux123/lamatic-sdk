// Function to check if the provided API key is valid.
// It checks if the key is a string and if its length is greater than 20.
export const isValidApiKey = (key : string) : Boolean => typeof key === "string" && key.length > 20;

// Function to handle errors.
// It logs the error message to the console and then throws a new error with the same message.
export function handleError (error : Error) : Error {
  console.error("[Lamatic SDK Error] : ", error.message);
  throw new Error(error.message);
};

// Function to introduce a delay in the execution.
// It returns a promise that resolves after the specified number of milliseconds.
export const delay = (ms : number) : Promise<any> => new Promise((resolve) => setTimeout(resolve, ms));

// Exporting the utility functions.
export default { isValidApiKey, handleError, delay };
