import { ItemKeyword } from '../../types/keywords';
import Tag from './Tag';
import './Tags.css';


type Props = {
  tag: ItemKeyword;
};

export default function ItemTag({ tag }: Props) {
  return (
    <Tag tag={tag} className={`item-tag`} />
  );
}
