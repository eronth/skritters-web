import { SkritterKeyword } from '../../types/keywords';
import './SkritterTags.css';
import Tag from './Tag';

type Props = {
  tags: SkritterKeyword[];
};

export default function CreatureTags({ tags }: Props) {
  return (
    <div className="tags-container">
      {tags.map((tag, id) => (
        <Tag key={id} tag={tag} className="creature-tag" 
          style={{ marginRight: '0.5em' }}
        />
      ))}
    </div>
  );
}
