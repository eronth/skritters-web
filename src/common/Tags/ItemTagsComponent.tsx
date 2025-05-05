import { ItemKeyword } from '../../types/keywords';
import ItemTag from './ItemTag';
import './Tags.css';

type Props = {
  tags: ItemKeyword[];
};

export default function ItemTagsComponent({ tags }: Props) {
  return (
    <div className="tags-container">
      {tags.map((tag, id) => (
        <ItemTag key={id} tag={tag} />
      ))}
    </div>
  );
}
