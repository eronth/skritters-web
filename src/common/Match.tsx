
export default function Match({ plural }: { plural?: boolean }) {
  return (
    <span className="match">
      Mission{plural ? 's' : ''}
    </span>
  );
}