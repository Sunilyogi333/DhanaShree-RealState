export const englishToNepaliNumber = (num: string | number): string => {
  if (num === null || num === undefined || num === "") return "";
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((d) => (/\d/.test(d) ? map[+d] : d))
    .join("");
};

export const nepaliToEnglishNumber = (nepaliNum: string): string => {
  if (!nepaliNum) return "";
  const map: Record<string, string> = {
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
  };
  return nepaliNum
    .split("")
    .map((d) => map[d] || d)
    .join("");
};