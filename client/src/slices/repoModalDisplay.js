import { createSlice } from '@reduxjs/toolkit'

export const repoModalSlice = createSlice({
  name: 'display_repo_modal',
  initialState: {
    value: {
        opacity: "0",
        display: "none",
        repo_title: "",
        repo_owner: "",
        last_updated: "",
        forks: "",
        open_issues: "",
        watchers_count: "",
        private: "",
        size: 0,
        default_branch: "",
        description: "",
        commits: [[]],
    }
  },
  reducers: {
    show_repo_modal: (state, action) => {
      state.value = {
        opacity: "1",
        display: action.payload.display,
        repo_title: action.payload.repo_title,
        repo_owner: action.payload.repo_owner,
        last_updated: action.payload.last_updated,
        forks: action.payload.forks,
        open_issues: action.payload.open_issues,
        watchers_count: action.payload.watchers_count,
        private: action.payload.private,
        size: action.payload.size,
        default_branch: action.payload.default_branch,
        description: action.payload.repo_description,
        commits: action.payload.commits,
      }
    },
    close_repo_modal: (state) => {
      state.value = {
        opacity: "0",
        display: "none",
        repo_title: "",
        repo_owner: "",
        last_updated: "",
        forks: "",
        open_issues: "",
        watchers_count: "",
        private: "",
        size: 0,
        default_branch: "",
        description: "",
        commits: [[]],
      }
    },
  },
})

export const { show_repo_modal, close_repo_modal } = repoModalSlice.actions

export default repoModalSlice.reducer