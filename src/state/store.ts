import {
      configureStore,
      ThunkAction,
      Action,
      combineReducers,
    } from "@reduxjs/toolkit";
    import authReducer from "../auth/auth.slice";
    import { persistStore, persistReducer } from "redux-persist";
    import storage from "redux-persist/lib/storage";
  
    
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["auth"],
    };
    
    const reducers = combineReducers({
      auth: authReducer,
     
    });
    
    const persistedReducer = persistReducer(persistConfig, reducers);
    
    export const store = configureStore({
      reducer: persistedReducer,
      // devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(profileApi.middleware)
    });
    
    export type AppDispatch = typeof store.dispatch;
    export type RootState = ReturnType<typeof store.getState>;
    export type AppThunk<ReturnType = void> = ThunkAction<
      ReturnType,
      RootState,
      unknown,
      Action<string>
    >;
    
    export const persistor = persistStore(store);
    