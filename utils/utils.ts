export const convertDateToString = (timestamp: number): string => {
  const date = new Date(timestamp);
  const monthValue = date.getMonth() + 1;

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthValue.toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
};

export const getClosestDate = (array: Item[]): string => {
  const emptyEndTime = 99999999999999;
  if (array.length === 0 || !array) return "";

  const minValue = Math.min(
    ...array.map((item) => (item.end ? item.end : emptyEndTime))
  );

  if (minValue === emptyEndTime) return "";
  return convertDateToString(minValue);
};

export const countDoneSum = (type: ItemType, array: DoneItem[]): string => {
  if (!array || array.length === 0) return "";

  if (type === "debt") {
    return array.filter((debt) => debt.type === "debt").length.toString();
  }

  if (type === "due") {
    return array.filter((due) => due.type === "due").length.toString();
  }
  return "";
};
