import React from 'react';
import MongoTrackerContainer from '../components/mongoTracker/mongoTrackContainer';
import NavTop from '../components/nav/navTop/navTop';
import UserContainer from '../components/profData/userContainer';
import RepoTrackerContainer from '../components/repoTracker/repotrackContainer';
import AnalyticsContainer from '../components/siteAnalytics/analyticsContainer';
import '../styles/App.scss';

function App() {
  return (
    <div className="App">
       <NavTop />
       <UserContainer />
       <AnalyticsContainer />
       <RepoTrackerContainer />
       <MongoTrackerContainer />
    </div>
  );
}

export default App;
