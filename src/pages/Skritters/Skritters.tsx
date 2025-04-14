import Header from "../../common/Header"
import SkritterComponent from "../../common/SkritterComponent";
import { armordilloKnight, porcupine } from "../../data/skritter-data";
import { Skritter } from "../../types/types";


export default function Skritters() {

  const skrits: Skritter[] = [
    {...porcupine},
    {...armordilloKnight}
  ];

  return (
    <div>
      <Header selectedTab="skritters"/>
      <h1>Skritters</h1>
      {
        skrits.map((skritter, index) => 
          <SkritterComponent key={index} skritter={skritter} />
        )
      }
    </div>
  );
}