const API_HOST = import.meta.env.VITE_API_HOST;

export const createNote = async (value: string) => {
  const res = await fetch(`${API_HOST}/notes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  }).then((res) => res.json());
  return res;
};

export const deleteNote = async (id: string) => {
  const res = await fetch(`${API_HOST}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return res;
};

export const getNotes = async (query = '') => {
  const res = await fetch(`${API_HOST}/notes?q=${query}`).then((res) =>
    res.json()
  );
  return res;
};
