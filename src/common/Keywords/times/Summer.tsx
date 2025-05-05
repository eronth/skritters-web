import Keyword from "../Keyword";

export default function Summer() {
  const season = 'Summer';

  return (
    <Keyword className={`season ${season.toLowerCase()}`}>
      <i className='ra ra-honeycomb' /> {season}
      {/* <i className='ra ra-sun-symbol' /> {season} */}
    </Keyword>
  );
}