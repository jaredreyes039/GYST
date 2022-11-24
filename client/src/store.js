import { configureStore } from '@reduxjs/toolkit'
import issueModalSliceReducer from './slices/issueModalDisplay'
import repoModalSliceReducer from './slices/repoModalDisplay'
import issueListModalSliceReducer from './slices/issueListModalDisplay'
import pubRepoModalSliceReducer from './slices/pubRepoModalDisplay'
import privRepoModalSliceReducer from './slices/privRepoModalDisplay'

// REDUX FUNCTIONALITY ONLY

export default configureStore({
  reducer: {
    issueModalDisplay: issueModalSliceReducer,
    repoModalDisplay: repoModalSliceReducer,
    issueListModalDisplay: issueListModalSliceReducer,
    pubRepoModalDisplay: pubRepoModalSliceReducer,
    privRepoModalDisplay: privRepoModalSliceReducer,
  },
})