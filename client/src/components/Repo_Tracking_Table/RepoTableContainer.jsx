import RepoTable from './RepoTable';
import '../../styles/component_styles/table_container.scss'
export default function RepoTableContainer(){
    return(
        <div className='table-overlay'>
        <RepoTable />
        </div>
    )
}