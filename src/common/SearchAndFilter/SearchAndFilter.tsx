import { Filter } from '../../types/types';
import Filtering from './Filtering/Filtering';
import Search from './Search/Search';
import './SearchAndFilter.css';

type Props = {
  searchTermState: [string, React.Dispatch<React.SetStateAction<string>>];
  filters?: Filter[];
};

export default function SearchAndFilter({ searchTermState, filters }: Props) {
  return (<>
    <div className="search-filter-container">
      <Search searchTermState={searchTermState} />
      <Filtering filters={filters} />
    </div>
  </>);
}
