/* eslint-disable no-console */
const originalWarn = console.warn;
const originalError = console.error;

const throwError = (message) => {
    throw new Error(message);
};

export const makeConsoleThrow = () => {
    console.warn = throwError;
    console.error = throwError;
};

export const restoreConsole = () => {
    console.warn = originalWarn;
    console.error = originalError;
};
