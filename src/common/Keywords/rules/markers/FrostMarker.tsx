import Keyword from "../../Keyword";

export default function FrostMarker() {
  const markerName = "Frost";
  return (
    <Keyword className={`marker ${markerName.toLowerCase()}`}>
      {markerName} Marker
    </Keyword>
  );
}