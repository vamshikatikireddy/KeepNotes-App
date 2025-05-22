export const getNoteId = (data: any) => {
  let id = "note";
  for (const key in data) {
    if (key !== "id") {
      id += key;
      id += [key].length;
      id += data[key];
      id += data[key].length;
      id += "-";
      id += Math.random().toString(36).substring(2, length);
    }
  }
  id += new Date().getTime().toString().substring(0, length);
  return id;
};
