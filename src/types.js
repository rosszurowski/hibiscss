
export type RuleProperty = string;
export type RuleValue = number | string;
export type RuleOptions = {
  prefix?: string,
  unit?: string,
  responsive?: boolean
};
export type Rule = {
  selector: string,
  properties: { [RuleProperty]: string },
  prefix?: string,
  responsive?: boolean
};
