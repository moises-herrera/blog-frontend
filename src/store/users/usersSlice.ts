import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "src/interfaces";
import { getFollowers, getFollowing, getUser, getAllUsers } from ".";

const initialState: UsersState = {
  list: [],
  isLoading: false,
  totalUsers: 0,
  resultsCount: 0,
  error: "",
  followers: [],
  followersResultsCount: 0,
  followersLoading: false,
  following: [],
  followingResultsCount: 0,
  totalFollowing: 0,
  followingLoading: false,
  userProfile: null,
  userProfileLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addFollowing: (state, { payload: { user, currentUser } }) => {
      const userFollowing = {
        ...user,
        followers: [...user.followers, currentUser._id],
      };
      state.following = [...state.following, userFollowing];

      if (state.followers.some(({ _id }) => _id === user._id)) {
        state.followers = state.followers.map((data) =>
          data._id !== user._id ? data : userFollowing
        );
      }

      if (
        state.userProfile &&
        !state.userProfile?.followers.some((id) => id === currentUser._id)
      ) {
        state.userProfile = {
          ...state.userProfile,
          followers: [...state.userProfile.followers, currentUser._id],
        };
      }
    },
    removeFollowing: (state, { payload: { user, currentUser } }) => {
      const userFollowing = {
        ...user,
        followers: user.followers.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (follower: any) => follower !== currentUser._id
        ),
      };
      state.following = state.following.filter(({ _id }) => _id !== user._id);

      if (state.followers.some(({ _id }) => _id === user._id)) {
        state.followers = state.followers.map((data) => {
          if (data._id !== user._id) return data;

          return userFollowing;
        });
      }

      if (
        state.userProfile &&
        state.userProfile?.followers.some((id) => id === currentUser._id)
      ) {
        state.userProfile = {
          ...state.userProfile,
          followers: state.userProfile.followers.filter(
            (id) => id !== currentUser._id
          ),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllUsers.fulfilled,
      (state, { payload: { data, total, page, resultsCount } }) => {
        state.list = page > 1 ? [...state.list, ...data] : data;
        state.totalUsers = total;
        state.resultsCount = resultsCount;
        state.isLoading = false;
      }
    );
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getFollowers.pending, (state) => {
      state.followersLoading = true;
    });
    builder.addCase(
      getFollowers.fulfilled,
      (state, { payload: { data, page, resultsCount } }) => {
        state.followers = page > 1 ? [...state.followers, ...data] : data;
        state.followersResultsCount = resultsCount;
        state.followersLoading = false;
      }
    );
    builder.addCase(getFollowers.rejected, (state, { payload }) => {
      state.followersLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getFollowing.pending, (state) => {
      state.followingLoading = true;
    });
    builder.addCase(
      getFollowing.fulfilled,
      (state, { payload: { data, page, total, resultsCount } }) => {
        state.following = page > 1 ? [...state.following, ...data] : data;
        state.totalFollowing = total;
        state.followingResultsCount = resultsCount;
        state.followingLoading = false;
      }
    );
    builder.addCase(getFollowing.rejected, (state, { payload }) => {
      state.followingLoading = false;
      state.error = payload?.message;
    });

    builder.addCase(getUser.pending, (state) => {
      state.userProfileLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.userProfile = payload;
      state.userProfileLoading = false;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.userProfileLoading = false;
      state.error = payload?.message;
    });
  },
});

export const { addFollowing, removeFollowing } = usersSlice.actions;
