import { englishToNepaliNumber, nepaliToEnglishNumber } from "./numberUtils";


export const formatNumberByLanguage = (num: number | string, language: string) => {
    if (language === "ne") {
      return englishToNepaliNumber(num);
    }
    return nepaliToEnglishNumber(num.toString());
  };


