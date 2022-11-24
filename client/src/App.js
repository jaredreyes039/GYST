import AssignedIssuesBlock from "./components/Info_Blocks/AssignedIssues";
import PubReposBlock from "./components/Info_Blocks/PubRepos";
import RepoTableContainer from "./components/Repo_Tracking_Table/RepoTableContainer";
import PrivReposBlock from "./components/Info_Blocks/PrivRepos";
import GistsBlock from "./components/Info_Blocks/Gists";
import ProjectsBlock from "./components/Info_Blocks/Projects";
import {useQuery} from '@tanstack/react-query'
import IssuesContainer from "./components/Issue_Manager/IssuesContainer";
import IssueModal from "./components/Modals/IssueModal";
import { useSelector } from 'react-redux'
import RepoModal from "./components/Modals/RepoModal";
import { useEffect, useState } from "react";
import axios from "axios";
import IssueListModal from "./components/Modals/IssueListModal";
import PubReposModal from "./components/Modals/PubReposModal";
import PrivReposModal from "./components/Modals/PrivReposModal";
import SocialMetrics from "./components/Info_Blocks/SocialMetrics";
import './styles/app_styles/app.scss'
import './styles/app_styles/global.scss'


function App() {

  // Token
  const [token, setToken] = useState("")

  // Cookie Parser
  function cookieParser(name) 
  {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return(match[2]);
    }
    else{
         return('--something went wrong---');
    }
 }

  // REDUX FUNCTIONALITY
  const issue_modal_display = useSelector((state)=>state.issueModalDisplay.value)
  const repo_modal_display = useSelector((state)=>state.repoModalDisplay.value)
  const issue_list_modal_display = useSelector((state)=>state.issueListModalDisplay.value)
  const pub_repo_modal_display = useSelector((state)=>state.pubRepoModalDisplay.value)
  const priv_repo_modal_display = useSelector((state)=>state.privRepoModalDisplay.value)

  // REACT-QUERY FUNCTIONALITY
  const {isLoading, data, isSuccess} = useQuery(['repos'], ()=>{
    let session = cookieParser("USRCDE");
    return axios
        .get(`/user/${session}`)
}, {refetchIntervalInBackground: 10000, refetchInterval: 10000})

useEffect(()=>{
if (isLoading){
  setToken("")
}
if (isSuccess){
  setToken(data.data.token)
}
}, [isLoading, isSuccess, data])

  return (
    <div className="App">
      <div className="App-overlay">
        <div className="modals-hidden">
          <RepoModal token={token} default_branch={repo_modal_display.default_branch} forks={repo_modal_display.forks} commits={repo_modal_display.commits} repo_desc={repo_modal_display.description} title={repo_modal_display.repo_title} owner={repo_modal_display.repo_owner} updated={repo_modal_display.last_updated} display={repo_modal_display.display} opacity={repo_modal_display.opacity} />
          <IssueModal display={issue_modal_display.display} reactions={issue_modal_display.reactions} assignees={issue_modal_display.assignees} body={issue_modal_display.body} title={issue_modal_display.title} opacity={issue_modal_display.opacity} comments={issue_modal_display.comments} user_data={issue_modal_display.user_data}/>
          <IssueListModal display={issue_list_modal_display.display}  opacity={issue_list_modal_display.opacity}/>
          <PubReposModal display={pub_repo_modal_display.display} opacity={pub_repo_modal_display.opacity} />
          <PrivReposModal display={priv_repo_modal_display.display} opacity={priv_repo_modal_display.opacity} />
        </div>

        <div className="top-row">
        <AssignedIssuesBlock />
        <PubReposBlock />
        <PrivReposBlock />
        <GistsBlock />
        <ProjectsBlock />
        <SocialMetrics />
        </div>

        <div className="bottom-row">
          <RepoTableContainer />
          <IssuesContainer />
        </div>

      </div>
    </div>
  );
}

export default App;
