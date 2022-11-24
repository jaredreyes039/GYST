import { createSlice } from '@reduxjs/toolkit'

export const issueListModalSlice = createSlice({
  name: 'display_issue_list_modal',
  initialState: {
    value: {
        opacity: "0",
        display: "none",
    }
  },
  reducers: {
    show_issue_list_modal: (state, action) => {
      state.value = {
        opacity: "1",
        display: "",
      }
    },
    close_issue_list_modal: (state) => {
      state.value = {
        opacity: "0",
        display: "none",
      }
    },
  },
})

export const { show_issue_list_modal, close_issue_list_modal } = issueListModalSlice.actions

export default issueListModalSlice.reducer