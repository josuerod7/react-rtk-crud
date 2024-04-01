import { createSlice } from "@reduxjs/toolkit";
//import data from 'http://localhost:5000/read-file'; // Importa el archivo JSON


const initialState = {
  data: [],
};

const userSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadDataSuccess: (state, action) => {
      state.data = action.payload; // Actualizamos los items con los datos recibidos
    },
    addTask: (state, action) => {
      state.data.push(action.payload);
      saveData(state);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;console.log(id);
      const foundTask = state.data.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
      saveData(state);
    },
    deleteTask: (state, action) => {
      const foundTask = state.data.find((task) => task.id === action.payload);
      if (foundTask) {
        state.data.splice(state.data.indexOf(foundTask), 1);
      }
      saveData(state);
    },
  },
});

// Función para guardar datos en el archivo JSON
const saveData = async (data) => {
  const jsonData = JSON.stringify(data).toString();
  try {
    await fetch('http://localhost:5000/modify-file/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });
  } catch (error) {
    console.error('Error al guardar datos:', error);
  }
};

// Función para cargar datos desde el servidor
export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/read-file'); // Hacemos la solicitud GET al servidor
      if (!response.ok) {
        throw new Error('No se pudo cargar los datos');
      }
      const data = await response.json(); // Convertimos la respuesta a JSON
      dispatch(loadDataSuccess(data)); // Disparamos la acción con los datos recibidos
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
};

export const { addTask, editTask, deleteTask, loadDataSuccess } = userSlice.actions;
export default userSlice.reducer;