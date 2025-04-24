import Keyword from "../../Keyword";

export default function Autumn() {
  const season = 'Autumn';

  return (
    <Keyword className={`season ${season.toLowerCase()}`}>
      <i className='ra ra-acorn' /> {season}
      <i className='ra ra-zigzag-leaf' /> {season}
    </Keyword>
  );
}