import Keyword from "../Keyword";

export default function Spring() {
  const season = 'Spring';

  return (
    <Keyword className={`season ${season.toLowerCase()}`}>
      <i className='ra ra-flowers' /> {season}
    </Keyword>
  );
}