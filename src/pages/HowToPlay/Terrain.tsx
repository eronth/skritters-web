export default function Terrain() {
  return (<>
    <h2>Terrain</h2>
    // TODO: Pleasant and harsh terrain rules here.
    {/* Pleasant and Harsh Terrain
While all terrain in Skritters can be wondrous or threatening, 
Wonderful Tree - The Wonderful tree has easy to reach branches. After a Medium or Large Skritter has climbed 1”, they no longer need a climb check to continue climbing. Small Skritters get a +1d6 to their climb check to climb all parts of the tree. Units inside the canopy of the tree gain +1SIZE to Defense.
Determine the area of the tree’s effect based on its canopy, usually about 1” radius.
Spring		The tree provide protection against the Soaked spring effect, completely negating it. This does not cancel the bonus WATERFOND creatures receive for spring.
Summer	The tree provides shade from the sun’s brutal heat. Overheat checks against a unit under the tree’s canopy have -1SIZE.
Autumn	The area around the tree is covered in crunch leaves. If a Cloaked unit moves within range, they must be Revealed or Dismissed. Weave attacks get +1SIZE, and as an action you can find a Whimsical resource.
Winter		No additional effect.

Flowerbloom Field - Flowerbloom Fields grant +1SIZE to Weave checks inside of it.
Spring		If you end the scenario with at least one Skritter in a Flowerbloom Field, gain a Stored resource.
Summer	No additional effect.
Autumn	Flowerbloom Fields are withered in Autumn, and do not provide a bonus.
Winter		Flowerbloom Fields are withered in Autumn, and do not provide a bonus.

Rolling Flames - If a Skritter attempts to enter a rolling flame, they must succeed a SuCheck(1d6) panic check. If they fail, they cannot willingly enter a Rolling Flame during this movement, and must alter their planned route accordingly. If they succeed, they may enter the rolling flame. If a Skritter enters or starts their activation inside a Rolling Flame, or a Rolling Flame moves through a Skritter, the flame makes a 2d8 Weave Attack against them.
At the start of each round, for each Rolling Flame roll a 1d8 to determine which direction it moves (with 1 being north, 2 being north-east, and so on), then roll a 1d4 to determine how many inches it moves. Rolling flames cannot move onto or across nonflammable terrain bigger than .5” (such as onto dirt roads or similar). If a Rolling Flame were to move over a Skritter, that skritter must make a Panic Check as detailed above. If they succeed, they may stay still, or may choose to move up to 1” in the direction they choose that best gets out of the way of the flame (e.g., they cannot willingly move into the Flame’s future path, nor into the flame itself).
If they fail, roll a d8 to determine the direction they flee. A failure can cause a Skritter to scurry through the flame or into its future path, which would require yet another panic roll. 
Spring		Rolling Flames are not present in Spring.
Summer	No additional effect.
Autumn	Before a Rolling Flame moves, roll a 1d10. On a 10, add another Rolling Flame in contact with the existing one (without placing it on any nearby Skritters). Then, both Flames determine their movement separately.
Winter		Rolling Flames are not present in Winter.

Still Water - Each inch of movement on water counts as 2 inches of movement. WATERFOND creatures do not suffer this movement penalty.
Spring		Waterfond creatures are simply happier. : )
Summer	Ending an activation in water automatically skips the Overheat check.
Autumn	
Winter		The Still Water is frozen over as ice. Each inch of movement on ice counts as 1.5 inches of movement. Additionally, WATERFOND Skritters are no longer immune to the penalty. After you end your movement, make a SuCheck(1d6). If you do not succeed, your opponent 

Moving Water - Each inch of movement on water counts as 2 inches of movement. WATERFOND creatures do not suffer this movement penalty.
Spring		
Summer	Ending an activation in water automatically skips the Overheat check.
Autumn	
Winter		

Mud - Each inch of mud counts as 2 inches.
Spring		No extra effect..
Summer	The mud is dried up and has no effect. (Action to kick up dust?)
Autumn	No extra effect.
Winter		Additionally, ending your activation in mud causes a Weave attack with 2d4, you may defend.

Thorny Brambles/Prickle Field - When entering Thorny Brambles or a Prickle Field, the brambles make a Brawl attack with 2d6, you may defend.

Brushfire */}

  </>);
}