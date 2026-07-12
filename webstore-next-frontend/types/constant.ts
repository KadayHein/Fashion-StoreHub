import { DataType } from "./enum";

type FieldType = {
  label: string;
  value: string;
};

export const CONDITIONAL_TYPE : ReadonlyMap<DataType, FieldType[]> = new Map([
    [DataType.STRING, [
        {label : "Equals", value: "eq"},
        {label : "Begin with", value: "bw"},
        {label : "End with", value: "ew"},
        {label : "Contains", value: "ct"}
    ]], 
    [DataType.NUMBER, [
        {label : "Equals", value: "eq"},
        {label : "Greater than", value: "gt"},
        {label : "Less than", value: "lt"},
        {label : "Greater than or Equals", value: "ge"},
        {label : "Less than or Equals", value: "le"},
        {label : "Between", value: "bt"}
    ]], 
    [DataType.DATETIME, [
        {label : "Equals", value: "eq"},
        {label : "Before", value: "bf"},
        {label : "After", value: "af"},
        {label : "Between", value: "bt"}
    ]],
    [DataType.BOOLEAN, [
        {label : "True", value: "1"},
        {label : "False", value: "0"}
    ]]
]);