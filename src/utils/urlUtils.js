/**
 * URL-аас параметр авах utility функц
 * Жишээ: https://ona.oneplace.hr/find?url=af94f905-74c5-48bd-96d7-43643be67c54
 * extractUrlParam('url') -> 'af94f905-74c5-48bd-96d7-43643be67c54'
 */
export const extractUrlParam = (paramName) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
};

/**
 * Хэрэглэгчийн ID-ийг URL-аас авах
 */
export const getUserIdFromUrl = () => {
    return extractUrlParam('url');
};

/**
 * URL-д параметр байгаа эсэхийг шалгах
 */
export const hasUrlParam = (paramName) => {
    return extractUrlParam(paramName) !== null;
};
