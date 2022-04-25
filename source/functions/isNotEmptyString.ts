import isString from './isString';
export default s => isString(s) && '' !== s.trim();
