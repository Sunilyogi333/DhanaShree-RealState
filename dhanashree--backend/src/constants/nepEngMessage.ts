export const alreadyExist = (en: string, np: string) => {
  return {
    en: `${en} already exist`,
    np: `${np} पहिले नै अवस्थित छ`,
  }
}
export const getNotFoundMessage = (en: string, np: string) => {
  return {
    en: `${en} not found`,
    np: `${np} फेला परेन`,
  }
}
export const deletedMessage = (en: string, np: string) => {
  return {
    en: `${en} deleted successfully`,
    np: `${np} सफलतापूर्वक हटाइयो`,
  }
}
export const UpdatedMessage = (en: string, np: string) => {
  return {
    en: `${en} updated successfully`,
    np: `${np} ससफलतापूर्वक अइडेट गरियो`,
  }
}
export const CreatedMessage = (en: string, np: string) => {
  return {
    en: `${en} updated successfully`,
    np: `${np} सफलतापूर्वक सिर्जना गरियो`,
  }
}
