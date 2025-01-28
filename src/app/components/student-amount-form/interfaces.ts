export interface IFormDetails {
  MorningExaminees: number | undefined;
  NoonExaminees: number | undefined;
  LabsCnt: number | undefined;
  Area: IArea | undefined;
  Coordinator: ICoordinator | undefined;
  Examiners: (string | undefined)[];
}

export interface ICoordinator {
  Name: string;
  Phone: string;
  Email: string;
}

export interface IArea {
  id: number;
  areaName: string;
}