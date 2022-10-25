import { KeyLabelObject } from "../models/generic.model";

export function transformStringToKeyLabelObject(data: string): KeyLabelObject {
  return { name: data, value: data };
}

export const toLabel = (keyLabelObject: KeyLabelObject) => keyLabelObject.name;
export const toValue = (keyLabelObject: KeyLabelObject) => keyLabelObject.value;
