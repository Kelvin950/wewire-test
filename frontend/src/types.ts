
import { FieldError, UseFormRegister } from "react-hook-form";
export interface User {
  id: number;
  email: string;
  token: string;
  password?:string
}

export  interface formData {
  email: string;
  password?: string;
  amount: number;
}


export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<formData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className:string ;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  date: string;
}


  export type ValidFieldNames =
    | "email"
    | "password"
    | "amount"
    
    
