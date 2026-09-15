import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "~/features/Auth/AuthSlice";
import postReducer from "~/features/Post/PostSilce";

const logger = createLogger();

const persistConfig = {
  key: "User",
  storage: storage.default || storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewareList = getDefaultMiddleware({
      serializableCheck: false,
    });
    if (import.meta.env.DEV) {
      middlewareList.push(logger);
    }
    return middlewareList;
  },
});

export const persistor = persistStore(store);
