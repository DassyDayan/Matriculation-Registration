export interface IModerator {
  iModeratorId: number;
  nvFirstName: string;
  nvLastName: string;
  nvRegion?: string;
  iSysRowStatus: number;
}

export interface IMatriculationFormViewModel {
  MorningTesters: number|undefined;
  EveningTesters: number|undefined;
  Moderator: IModerator | null | undefined;
  CoordinatorName: string;
  CoordinatorEmail: string;
  CoordinatorPhone: string;
  LaboratoryRooms: number;
  AccompanyingTeachers: string[];
}

export interface IUpdateMatriculationDataRequest {
  MorningTesters: number;
  EveningTesters: number;
  ModeratorId: number;
  CoordinatorName: string;
  CoordinatorEmail: string;
  CoordinatorPhone: string;
  LaboratoryRooms: number;
  AccompanyingTeachers: string[];
}