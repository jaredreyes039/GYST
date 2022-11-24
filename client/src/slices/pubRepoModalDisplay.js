import { createSlice } from '@reduxjs/toolkit'

export const pubRepoModalSlice = createSlice({
  name: 'display_pub_repo_modal',
  initialState: {
    value: {
        opacity: "0",
        display: "none",
        repo_title: "",
        repo_owner: "",
        last_updated: "",
        size: 0,
        description: "",
    }
  },
  reducers: {
    show_pub_repo_modal: (state, action) => {
      state.value = {
        opacity: "1",
        display: action.payload.display,
        repo_title: action.payload.repo_title,
        repo_owner: action.payload.repo_owner,
        last_updated: "",
        size: action.payload.size,
        description: action.payload.repo_description,
      }
    },
    close_pub_repo_modal: (state) => {
      state.value = {
        opacity: "0",
        display: "none",
        repo_title: "",
        repo_owner: "",
        last_updated: "",
        size: 0,
        description: "",
      }
    },
  },
})

export const { show_pub_repo_modal, close_pub_repo_modal } = pubRepoModalSlice.actions

export default pubRepoModalSlice.reducer