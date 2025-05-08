import { ItemKeyword } from '../../types/keywords';
import Tag from './Tag';
import './Tags.css';


type Props = {
  tag: ItemKeyword;
};

export default function ItemTag({ tag }: Props) {

  const rest = (<>
    {
      tag == 'METALORPLANT'
      ? <>
        <Tag tag={'METAL'} className={`item-tag`} />
        or
        <Tag tag={'PLANT'} className={`item-tag`} />
        </>
      : <Tag tag={tag} className={`item-tag`} />
    }
  </>);

  return (<>{rest}</>);
}
