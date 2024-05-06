import { type Facility } from "./facility";
import { type Question } from "./question";

export type Country = {
  id: number;
  code: string;
  name: string;
  facilityList: Facility[];
  questionList: Question[];
  // Mapping
  dialingCode?: string;
};
