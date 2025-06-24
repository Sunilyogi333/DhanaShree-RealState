type Address = {
    municipality?: {
        municipalityTitle: string;
        municipalityTitleNepali: string;
    };
    district?: {
        districtTitle: string;
        districtTitleNepali: string;
    };
    province?: {
        provinceTitle: string;
        provinceTitleNepali: string;
    };
    ward?: {
        wardNumber: number;
        wardNumberNepali: string;
    };
  };
  
  export const formatAddressByLanguage = (address: Address, language: string): string => {
    const isNepali = language === "ne";
  
    const municipality = isNepali
      ? address.municipality?.municipalityTitleNepali
      : address.municipality?.municipalityTitle;
  
    const district = isNepali
      ? address.district?.districtTitleNepali
      : address.district?.districtTitle;

    const ward = isNepali
      ? address.ward?.wardNumberNepali
      : address.ward?.wardNumber;
  
    const province = isNepali
      ? address.province?.provinceTitleNepali
      : address.province?.provinceTitle;
  
    return [municipality, district, province, ward].filter(Boolean).join(", ");
  };
  


// form ma dekahuna 

  type LocalizedItem = {
    districtTitle?: string;
    districtTitleNepali?: string;
    municipalityTitle?: string;
    municipalityTitleNepali?: string;
  };
  
  export const getLocalizedLabel = (item: LocalizedItem, language: string): string => {
    if (!item) return "";
  
    if (item.districtTitle && item.districtTitleNepali) {
      return language === "ne" ? item.districtTitleNepali : item.districtTitle;
    }
    if (item.municipalityTitle && item.municipalityTitleNepali) {
      return language === "ne" ? item.municipalityTitleNepali : item.municipalityTitle;
    }
  
    return "";
  };