
export default function Match({ plural }: { plural?: boolean }) {
  return (
    <div className="match">
      Mission{plural ? 's' : ''}
    </div>
  );
}