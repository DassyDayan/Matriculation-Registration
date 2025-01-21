import { IArea } from "../components/student-amount-form/student-amount-form.interfaces";

export interface IRegistrationData {
  id?: string;
  testDate?: Date;
  registerLastDate?: Date;
  phone: string;
  areas: IArea[];
  attentionMessages: string[];
}