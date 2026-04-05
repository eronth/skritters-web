import { Filter } from '../../types/types';
import Filtering from './Filtering/Filtering';
import Search from './Search/Search';
import './SearchAndFilter.css';

type Props = {
  searchTermState: [string, React.Dispatch<React.SetStateAction<string>>];
  filters?: Filter[];
  stacked?: boolean;
};

export default function SearchAndFilter({ searchTermState, filters, stacked }: Props) {
  return (<>
    <div className="search-filter-container">
      <Search searchTermState={searchTermState} />
      <Filtering filters={filters} stacked={stacked} />
    </div>
  </>);
}
