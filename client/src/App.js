import { useEffect } from "react";
import DiskUsage from "./components/Info_Blocks/DiskUsage";
import FollowStatusBlock from "./components/Info_Blocks/FollowStatusBlock";
import GistBlock from "./components/Info_Blocks/GistBlock";
import HeaderBlock from "./components/Info_Blocks/HeaderBlock";
import PrivPubBlock from "./components/Info_Blocks/PrivPubBlock";
import IssuesContainer from "./components/Issue_Manager/IssuesContainer";
import NavBarContainer from "./components/Navigation/NavBarContainer";
import RepoTableContainer from "./components/Repo_Tracking_Table/RepoTableContainer";
import './styles/app_styles/app.scss'

function App() {

  return (
    <div className="App">
      <NavBarContainer />
      <div className="App-inner">
      <PrivPubBlock />
      <FollowStatusBlock />
      <HeaderBlock />
      <GistBlock />
      <DiskUsage />
      <IssuesContainer />
      <RepoTableContainer />
      </div>
    </div>
  );
}

export default App;
