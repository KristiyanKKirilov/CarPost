import { Car } from "./car";

export interface User{
    _id: string;
    email: string;
    phoneNumber: string;
    password: string;
    username: string;
    cars: string[];
    created_at: string;
};
