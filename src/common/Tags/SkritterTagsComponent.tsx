import { SkritterKeyword } from '../../types/keywords';
import SkritterTag from './SkritterTag';
import './Tags.css';

type Props = {
  tags: SkritterKeyword[];
};

export default function SkritterTagsComponent({ tags }: Props) {
  return (
    <div className="tags-container">
      {tags.map((tag, id) => (
        <SkritterTag key={id} tag={tag} />
      ))}
    </div>
  );
}
