export type ClassArray = ClassValue[];
export type ClassDictionary = Record<string, any>;
export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| bigint
	| null
	| boolean
	| undefined;

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const cn = (...classes: ClassValue[]) => classes.flat(10).filter(Boolean).join(' ');
