export const createUid = () => Math.random().toString(32).substring(2);

export const getNowDay = (): string => {
  return new Date().toLocaleString('ja');
};
