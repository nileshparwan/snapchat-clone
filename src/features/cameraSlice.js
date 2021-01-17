import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
    name: 'camera',
    initialState: {
        value: 0,
    },
    reducers: {
        setCameraImage: (state, action) => {
            state.cameraImage = action.payload;
        },
        resetCameraImage: (state) => {
            state.cameraImage = null;
        },
    },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage; //allows us to pull data from redux

export default cameraSlice.reducer;
