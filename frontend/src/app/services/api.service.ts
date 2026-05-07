export const fetchData = async () => {

  const response = await fetch(
    'http://localhost:5000/fetch-bases'
  );

  const result = await response.json();

  return result.data;
};

export const fetchBases = async () => {

  const response = await fetch(
    'http://localhost:5000/fetch-bases'
  );

  const result = await response.json();

  return result.data;
};

export const fetchTables = async (baseId: string) => {

  const response = await fetch(
    `http://localhost:5000/tables/${baseId}`
  );

  return await response.json();
};

export const fetchRecords = async (
  baseId: string,
  tableName: string
) => {

  const response = await fetch(
    `http://localhost:5000/records/${baseId}/${tableName}`
  );

  return await response.json();
};