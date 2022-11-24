import { createSlice } from '@reduxjs/toolkit'

export const privRepoModalSlice = createSlice({
  name: 'display_priv_repo_modal',
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
    show_priv_repo_modal: (state, action) => {
      state.value = {
        opacity: "1",
        display: ""
      }
    },
    close_priv_repo_modal: (state) => {
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

export const { show_priv_repo_modal, close_priv_repo_modal } = privRepoModalSlice.actions

export default privRepoModalSlice.reducer