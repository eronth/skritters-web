import { SkritterKeyword } from '../../types/keywords';
import Tag from './Tag';
import './Tags.css';

type Props = {
  tag: SkritterKeyword;
};

export default function SkritterTag({ tag }: Props) {
  return (
    <Tag tag={tag} className="creature-tag" />
  );
}
