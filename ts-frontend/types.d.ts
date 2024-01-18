declare global{
    type UserState = {
    id: number | null,
    firstName: string,
    lastName: string,
    email: string,
    username: string 
    password: string,
    status: enum 
    error: Error | string
    };
};


export {};