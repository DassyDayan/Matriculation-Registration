export interface IRegistrationDetails {
  year: Date;
  morningExaminees: number | undefined;
  noonExaminees: number | undefined;
  labRoomsAmount: number|undefined;
  divisionArea: string|undefined;
  finalDate: Date;
}

export interface Iprops {
  morningExaminees: number | undefined;
  noonExaminees: number | undefined;
  labRoomsAmount: number |undefined;
  divisionArea: string | undefined;
}