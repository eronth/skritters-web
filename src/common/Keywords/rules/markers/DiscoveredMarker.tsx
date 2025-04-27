import Keyword from "../../Keyword";

export default function DiscoveredMarker() {
  const markerName = "Discovered";
  return (
    <Keyword className={`marker ${markerName.toLowerCase()}`}>
      {markerName} Marker
    </Keyword>
  );
}