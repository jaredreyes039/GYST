import { createSlice } from '@reduxjs/toolkit'

export const issueModalSlice = createSlice({
  name: 'display_issue_modal',
  initialState: {
    value: {
        opacity: "0",
        title: "",
        assignees: "",
        body: "",
        reactions:{},
        display: "none",
        comments: [],
        user_data: {
          login: "",
          created_at: "",
          avatar_url: "",
          state: "",
        }
    }
  },
  reducers: {
    show_issue_modal: (state, action) => {
      state.value = {
        opacity: "1",
        title: action.payload.title,
        assignees: action.payload.assignees,
        body: action.payload.body,
        reactions: action.payload.reactions,
        display: "",
        comments: action.payload.comments,
        user_data: action.payload.user_data
      }
    },
    close_issue_modal: (state) => {
      state.value = {
        opacity: "0",
        title: "",
        assignees: "",
        body: "",
        reactions: {},
        display: "none",
        comments: [],
        user_data: {
          login: "",
          created_at: "",
          avatar_url: "",
          state: "",
        }
      }
    },
  },
})

export const { show_issue_modal, close_issue_modal } = issueModalSlice.actions

export default issueModalSlice.reducer