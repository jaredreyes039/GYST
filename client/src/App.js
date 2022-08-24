import BioBlock from "./components/Info_Blocks/BioBlock";
import DiskUsage from "./components/Info_Blocks/DiskUsage";
import FollowStatusBlock from "./components/Info_Blocks/FollowStatusBlock";
import GistBlock from "./components/Info_Blocks/GistBlock";
import HeaderBlock from "./components/Info_Blocks/HeaderBlock";
import PrivPubBlock from "./components/Info_Blocks/PrivPubBlock";
import NavBarContainer from "./components/Navigation/NavBarContainer";
import RepoTableContainer from "./components/Repo_Tracking_Table/RepoTableContainer";
import './styles/app_styles/app.scss'

function App() {
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
      
      </div>
    </div>
  );
}

export default App;
