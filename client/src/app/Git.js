import NavTop from "../components/nav/navTop/navTop";
import UserContainer from "../components/profData/userContainer";
import RepoManager from "../components/repoManager/repoMangContainer";
import RepoTrackerContainer from "../components/repoTracker/repotrackContainer";
import '../styles/App.scss'

function Git(){
    return(
        <>
        <div className="App">
        <NavTop />
        <UserContainer />
        <RepoTrackerContainer />
        <RepoManager/>
        </div>
        </>
    )
}

export default Git;