import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSliceReducer } from "./slices/user.slice";
import { themeSliceReducer } from "./slices/theme.slice";

const rootReducers = combineReducers({
  theme: themeSliceReducer,
  user: userSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "theme"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
