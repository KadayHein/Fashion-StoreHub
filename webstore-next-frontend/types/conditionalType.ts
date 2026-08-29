import { DataType } from "./enum";

type FieldType = {
  label: string;
  value: string;
};

export const CONDITIONAL_TYPE : ReadonlyMap<DataType, FieldType[]> = new Map([
    [DataType.STRING, [
        {label : "filterCondition.ct", value: "ct"},
        {label : "filterCondition.eq", value: "eq"},
        {label : "filterCondition.bw", value: "bw"},
        {label : "filterCondition.ew", value: "ew"},
    ]], 
    [DataType.NUMBER, [
        {label : "filterCondition.eq", value: "eq"},
        {label : "filterCondition.gt", value: "gt"},
        {label : "filterCondition.lt", value: "lt"},
        {label : "filterCondition.geq", value: "geq"},
        {label : "filterCondition.leq", value: "leq"},
        {label : "filterCondition.bt", value: "bt"}
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

