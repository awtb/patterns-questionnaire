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

export type Question = {
  id: number;
  text: string;
  schemaKey: SchemaKey;
};
