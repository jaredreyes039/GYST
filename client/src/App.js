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
  window.localStorage.setItem("Refresh_Frame", false)
  if(!window.localStorage.getItem("Refresh_Frame")){
    window.location.reload()
    window.localStorage.setItem("Refresh_Frame", true)
  }
  setInterval(()=>{
    window.localStorage.clear()
  }, 2500)
  return (
    <div className="App">
      <NavBarContainer />
      <div className="App-inner">
      <RepoTableContainer />
      <PrivPubBlock />
      <FollowStatusBlock />
      <HeaderBlock />
      <GistBlock />
      <DiskUsage />
      <IssuesContainer />
      </div>
    </div>
  );
}

export default App;
