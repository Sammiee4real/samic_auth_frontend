import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLoggedInUser, loginUser } from "./auth.api";
import { AuthState } from "./auth";

const initialState: any = {
  user: {},
  profilePicture: "",
  loggedIn: false,
  authToken:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS53YXppbWEuaGVhbHRoL2FwaS92MS9sb2dpbiIsImlhdCI6MTY2ODk3NzQxMywiZXhwIjoxNjY4OTk5MDEzLCJuYmYiOjE2Njg5Nzc0MTMsImp0aSI6Ijl5QXV2amVPMVNXN0tNTkUiLCJzdWIiOiIxIiwicHJ2IjoiZTE0Nzg3YWFiNjY2ODhjZTA2YzQ3MTJlNjczZTFhMWM0NGY0OTA5NCJ9.CAm8s_CAPtYQktOFiw89Q-aVr4KNen_2df1koXzzdng",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getLoggedInUserAsync = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }) => {
    return await loginUser(data);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.loggedIn = true;
      state.profilePicture = state.user.profile_photo_url;
    },
    logOut: (state) => {
      state.user = Object.assign({}, {});
      state.loggedIn = false;
    },
    updateSubscription: (state, action) => {
      state.user.active_subscription.id =  action.payload.id;
      state.user.active_subscription.plan= action.payload.plan
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        // @ts-ignore
        state.user = action.payload.user;
        // @ts-ignore
        state.authToken = action.payload.token.access_token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.log("here");
      });
  },
});

export const { updateUser, logOut, updateSubscription, updateProfilePicture } =
  authSlice.actions;

export default authSlice.reducer;
