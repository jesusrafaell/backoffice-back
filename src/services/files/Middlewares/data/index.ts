<<<<<<< HEAD
export const sqls: string[] = ['SELECT', 'DELETE', 'INSERT', 'UPDATE', 'WHERE', 'DROP', 'add'];
export const NoSQL = (v: any): boolean => !sqls.includes(v) && !sqls.find((sql: string) => `${v}`.includes(sql));

export * from './auth';
=======
export const sqls: string[] = ['SELECT', 'DELETE', 'INSERT', 'UPDATE', 'WHERE', 'DROP', 'add'];
export const NoSQL = (v: any): boolean => !sqls.includes(v) && !sqls.find((sql: string) => `${v}`.includes(sql));

export * from './auth';
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
