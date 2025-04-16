import { ItemKeyword } from '../../types/keywords';
import './SkritterTags.css';
import Tag from './Tag';

type Props = {
  tag: ItemKeyword;
};

export default function ItemTag({ tag }: Props) {
  return (
    <Tag tag={tag} className="item-tag bolded" 
      style={{ marginRight: '0.5em' }}
    />
  );
}
