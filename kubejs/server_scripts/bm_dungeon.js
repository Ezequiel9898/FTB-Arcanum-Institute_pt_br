// Bloodmagic Mob Nerf
onEvent('entity.spawned', event =>{
    const {entity, level, server} = event
    if(!entity.isLiving()) return
    if(level.dimension != "bloodmagic:dungeon") return

    const nearestPlayer = findClosestPlayer(entity)
    if (nearestPlayer == null) return
    if (!nearestPlayer) return

    const attributes = {
        'generic.armor': range(0, 2),
        'generic.armor_toughness': range(0, 2),
        'generic.attack_damage': range(1, 3),
    }

    if(nearestPlayer.stages.has('nerf_bloodmagic_dungeon_mobs')){
        Object.entries(attributes).forEach(([attribute, value]) => {
            entity.setAttributeBaseValue(attribute, value)
        })
    
        if(entity.mainHandItem.id == 'minecraft:bow'){
            entity.setMainHandItem('minecraft:bow')
            entity.mainHandItem.enchant('minecraft:power', range(1, 5))
        }
    }


})


const mobSpawnsDebug = false

function debugLog(message) {
  if (mobSpawnsDebug) {
    console.log(message)
  }
}


function horizontalDistanceSqr(x1, z1, x2, z2) {
    return (x1 - x2) * (x1 - x2) + (z1 - z2) * (z1 - z2)
  }
  
  function findClosestPlayer(entity) {
    let { level, server, x, z } = entity
  
    const players = server
    //   .getPlayerList()
      .getPlayers()
      .filter((player) => player.isAlive && player.level == level)
  
    if (players.length == 0) return null
  
    let nearestPlayer = players[0]
    let firstDistanceSqr = horizontalDistanceSqr(
      x,
      z,
      nearestPlayer.x,
      nearestPlayer.z
    )
  
    for (let player of players) {
      let x2 = player.x
      let z2 = player.z
  
      let distanceSqr = horizontalDistanceSqr(x, z, x2, z2)
  
      if (distanceSqr < firstDistanceSqr) {
        nearestPlayer = player
      }
    }
  
    return nearestPlayer
  }
  
  function toggleMobNerf(player){
    if(player.stages.has('nerf_bloodmagic_dungeon_mobs')){
      player.stages.remove('nerf_bloodmagic_dungeon_mobs')
      player.tell('<Prof. Saereth> I\'ll make those mobs harder for you')
    }else{
      player.stages.add('nerf_bloodmagic_dungeon_mobs')
      player.tell('<Prof. Saereth> I\'ll make those mobs easier for you')
    }
  }