export const getLastData = (list: Array<any>) => list[list.length - 1];

export const getNextId = (list: Array<any>) =>
  list.length === 0 ? 1 : getLastData(list).id + 1;
