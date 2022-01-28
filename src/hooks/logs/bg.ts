import chalk from 'chalk';

// log de informacion
export const Info = (msg: string) => console.log(chalk.bgBlue(msg));

// log de errores
export const Error = (msg: string) => console.log(chalk.bgRed(msg));

// log de advertencias
export const Warn = (msg: string) => console.log(chalk.bgYellow(msg));

// log de funcionamiento correcto
export const OK = (msg: string) => console.log(chalk.bgGreen(msg));

// log de funcionamiento correcto
export const Arrow = (msg: string) => console.log(chalk.bgMagenta(msg));

export default { Info, Error, Warn, OK };
