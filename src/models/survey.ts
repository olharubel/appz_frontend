export interface Survey {
    id: number;
    title: string;
    patientId: string;
    doctorId: string;
    doctorComment?: string;
    surveyStatus: string;
    dueDate: Date;
    surveyQuestions: SurveyQuestion[];
  }

export interface SurveyQuestion {
  id: number;
  text: string;
  options: string[];
  isRequired: boolean;
}