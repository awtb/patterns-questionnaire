export type SchemaKey =
  | 'abandonment'
  | 'mistrust_abuse'
  | 'vulnerability'
  | 'dependence'
  | 'emotional_deprivation'
  | 'social_exclusion'
  | 'defectiveness'
  | 'failure'
  | 'subjugation'
  | 'unrelenting_standards'
  | 'entitlement';

export type AnswerValue = 1 | 2 | 3 | 4 | 5 | 6;

export type Question = {
  id: number;
  text: string;
  schemaKey: SchemaKey;
};

export type QuestionAnswer = {
  childhood: AnswerValue;
  current: AnswerValue;
};

export enum SchemaFlag {
  None = 'none',
  Potential = 'potential',
  Expressed = 'expressed',
  StronglyExpressed = 'strongly_expressed'
}
