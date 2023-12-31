const coreSpawnPos = {
    top_right:      [-64, -26],
    top_left:       [-64,  22],
    bottom_right:   [-16, -26],
    bottom_left:    [-16,  22]
}


onEvent('entity.death', event =>{
    const {entity, target, level, server} = event
    if(level.dimension != "minecraft:the_end") return
    if(!entity.type.toString().includes('customnpcs')) return

    switch(entity.name.key){
        // Spawn Witch when Puppet dies
        case "Sealed Witch":{
            let command = `execute in minecraft:the_end run noppes clone spawn "Evil Witch Bossfight" 1 ${Math.floor(entity.x)} ${Math.floor(entity.y)} ${Math.floor(entity.z)}`
            server.runCommand(command)
            let core = getRandomCore()
            for(let position in coreSpawnPos){
                let core = getRandomCore()
                spawnCores(event, core, [coreSpawnPos[position][0], 58, coreSpawnPos[position][1]])
            }
            break
        }

        //Respawning Cores untill Witch is "dead"
        case "Earth Core":
        case "Fire Core":
        case "Fire Core #2":
        case "Water Core":
        case "Air Core":{
            server.scheduleInTicks(range(200, 400), event =>{
                let aabb = AABB.of(entity.x-100, entity.y-2, entity.z-100, entity.x+100, entity.y+150, entity.z+100)
                let entities = level.getEntitiesWithin(aabb)
                if(entities.toString().includes('Witch Lexxie')) {
                    let core = getRandomCore()
                    spawnCores(event, core, [entity.x, entity.y, entity.z])
                }
            })
            break
        }
        case "Evil Witch":{
            deadWitch(event)
            //more death logic here
        }

    }

})

onEvent('entity.hurt', event =>{
    const {entity, target, level, server, source} = event
    if(level.dimension != "minecraft:the_end") return
    if(!entity.type.toString().includes('customnpcs')) return
    if(source.type == 'outOfWorld') return
    switch(entity.name.key){
        case "Sealed Witch":{
            event.cancel()
            break
        }
    }
})


onEvent('block.place', event =>{
    const {player, level} = event
    if(level.dimension != 'minecraft:the_end') return
    if(isNear(player, {x:-40, z:-2}, 256)) event.cancel()
})
onEvent('block.break', event =>{
    const {player, level} = event
    if(level.dimension != 'minecraft:the_end') return
    if(isNear(player, {x:-40, z:-2}, 256)) event.cancel()
})



onEvent('block.right_click', event =>{ 
    const {level, block} = event
    
    if(
        level.dimension != 'minecraft:the_end' ||
        block.id != 'malum:twisted_tablet'
    ) return

    if(block.entityData.inventory.Items[0]){
        if(block.entityData.inventory.Items[0].id == 'malum:vivid_nitrate') event.cancel()
    }
})
onEvent("block.right_click", event =>{
    const {player, server, level, item, block} = event
    if(
        item.id != 'ftbai:codex_final' ||
        block.id != 'malum:twisted_tablet' ||
        level.dimension != 'minecraft:the_end'
    ) return

    server.scheduleInTicks(10, event =>{
        if(block.inventory.get(0) != 'ftbai:codex_final') return
        let flameParticle = new Particle('minecraft:flame')
        let smokeParticle = new Particle('minecraft:large_smoke')
        let itemParticle = new Particle('minecraft:large_smoke')
        itemParticle.yOffset = 0.6
        itemParticle.hSpread = 0.25
        itemParticle.vSpread = 0.05
        itemParticle.amount = 200
        itemParticle.cast(block)
        block.inventory.set(0, 'minecraft:air')



        let castingBlock = level.getBlock(block.x-1, block.y, block.z)
        let delay = 40
        let radius = 5

        let witch
        let wisps = []
        let players = []

        let aabb = AABB.of(castingBlock.x-25, castingBlock.y-2, castingBlock.z-25, castingBlock.x+25, castingBlock.y+25, castingBlock.z+25)
        let entities = level.getEntitiesWithin(aabb)
        entities.forEach(checkedEntity =>{
            if(checkedEntity.name.key == "Sealed Witch"){
                witch = checkedEntity
            }
            if(checkedEntity.type.toString().includes('whisperwoods')){
                wisps.push(checkedEntity)
            }
            if (checkedEntity.isPlayer()) {
                players.push(checkedEntity)
                let distance = checkedEntity.getDistance(castingBlock.x, castingBlock.y, castingBlock.z)
                distance = 20 - distance
                distance = distance / 20 * 2
                checkedEntity.playSound('mowziesmobs:geomancy.rumble2')
                checkedEntity.sendData('screenshake', { i1: distance * 0.6, i2: distance, i3: distance * 0.2, duration: 15 })
            }
        })




        // cast spell
        for(let i = 0; i < 5; i++){
            server.scheduleInTicks(delay, {radius: radius}, event =>{
                players.forEach(single_player =>{
                    single_player.playSound("ars_nouveau:fire_family")
                })

                castPentagram(castingBlock, flameParticle, event.data.radius)
            })
            radius += 2
            delay += 30
        }

        delay -= 30
        // set Animation
        let nbt = witch.fullNBT
        const {PuppetHead: head, PuppetLArm: lArm, PuppetLLeg: lLeg, PuppetRArm: rArm, PuppetRLeg: rLeg} = nbt
        server.scheduleInTicks(delay, event =>{
            players.forEach(single_player => {
                single_player.playSound('ftbai:witch_laugh')
            })
            nbt.PuppetAnimate = 1
            nbt.PuppetAnimationSpeed = 1
            nbt.ScriptEnabled = 0
            witch.fullNBT = nbt
        })
        delay += 45
        server.scheduleInTicks(delay, event =>{
            nbt.PuppetAnimate = 0
            nbt.PuppetAnimationSpeed = 0
            head.RotationX = 0
            lArm.RotationZ = 0
            lLeg.RotationZ = 0
            rArm.RotationZ = 0
            rLeg.RotationZ = 0
            witch.fullNBT = nbt

        })

        for(let i = 0; i < 75; i++){
            server.scheduleInTicks(delay, event =>{
                witch.setY(witch.y+0.05)
                witch.setHealth(witch.getHealth()+5)

            })
            delay += 1
        }
        let ballrange = 1
        smokeParticle.hSpread = 0.2
        smokeParticle.vSpread = 0.2
        for (let i = 0; i < 8; i++) {

            server.scheduleInTicks(delay, {i: i}, event =>{
                castParticleBall(witch, flameParticle, ballrange+event.data.i, 400)
                castParticleBall(witch, smokeParticle, ballrange+event.data.i, 400)

            })
            if(i >= 6){
                server.scheduleInTicks(delay, {i: i}, event =>{
                    castParticleBall(witch, smokeParticle, ballrange+event.data.i, 400)
                    const {x, y, z} = witch
                    level.getEntitiesWithin(AABB.of(x - 20, y - 20, z - 20, x + 20, y + 20, z + 20)).forEach(entity => {
                        if (entity.isPlayer()) {
                            let distance = entity.getDistance(x, y, z)
                            distance = 20 - distance
                            distance = distance / 20 * 2
                            entity.sendData('screenshake', { i1: distance * 0.6, i2: distance, i3: distance * 0.2, duration: 15 })
                        }

                    })
                    pushBack(castingBlock, player, 1.5, 0.2)

                    // server.runCommandSilent(`execute at @e[type=customnpcs:customnpc] in minecraft:the_end run playsound minecraft:entity.wither.death master @p[distance=..25]`)

                    player.playSound('minecraft:entity.generic.explode')

                })
            }
            delay += 0.25
        }
        server.scheduleInTicks(delay, event =>{
            sealHandler(event, player,"ftbai:airseal")
            server.runCommand(`execute as @e[type=minecraft:player] in minecraft:the_end run playsound ftbai:battle_music master @e[type=player, distance=..64] ~ ~ ~`)
            witch.kill()
            wisps.forEach(wisp =>{
                wisp.remove()
            })
            players.forEach(single_player =>{
                single_player.playSound('ftbai:battle_music', 0.2, 1)

            })

        })

    })

})

// Harder Mobs
onEvent('entity.spawned', event =>{
    const {entity, level, server} = event
    if(!entity.isLiving()) return
    if(level.dimension != "minecraft:the_end") return
    if(!entity.type.toString().includes('customnpcs')) return



    const radius = 64
    const healthScale = 0.1
    const attributes = [
        //[attribute, scale]
        ['generic.attack_damage', 0.1],
        ['generic.attack_knockback', 0.1],
        ['generic.armor', 1],
        ['generic.armor_toughness', 1],
        ['generic.movement_speed', 0.01]]

    modifyEntity(event, radius, healthScale, attributes)
})




// Devtools
onEvent("player.chat", event => {
    const {player, message} = event
    if (message.startsWith('!seal')) {
        sealHandler(event, player, "ftbai:sealv2")
    }
    if (message.startsWith('!air')) {
        sealHandler(event, player, "ftbai:airseal")
    }
    if(message.startsWith('!reset')){
        sealHandler(event, player, "ftbai:airseal")
        sealHandler(event, player, "ftbai:sealv2")
        event.server.runCommandSilent('kill @e[type=customnpcs:customnpc')
    }

})




function sealHandler(event, player, structure){
    const {server} = event
    let world = server.getLevel('minecraft:the_end')
    let kuLevel = new Ku.Level(player.level);
    kuLevel.spawnStructure(structure, world.getBlock(-41, 58, -5).getPos())
}
const getRandomCore = () => {
    const cores = [
        'Earth Core',
        'Air Core',
        'Fire Core',
        // 'Fire Core #2',
        'Water Core'
    ];
    const randomIndex = Math.floor(Math.random() * cores.length);
    return cores[randomIndex];
};
const spawnCores = (event, core, pos) => {

    const [x, y, z] = pos;
    const command = `execute in minecraft:the_end run noppes clone spawn "${core}" 1 ${Math.floor(x)} ${Math.floor(y)} ${Math.floor(z)}`;
    //console.log(command)
    event.server.runCommand(command);

    console.log(`Spawned a ${core} at Position: ${Math.floor(x)} ${Math.floor(y)} ${Math.floor(z)}`);
};

const killCores = (event, core, pos) => {
    const [x, y, z] = pos;
}

function modifyEntity(event, radius, healthScale, attributes){
    const {entity, level} = event
    const {x,y,z} = entity
    
    // Get Entities in an Area
    let aabb = AABB.of(x-radius, y-radius, z-radius, x+radius, y+radius, z+radius)
    let entities = level.getEntitiesWithin(aabb)
    let totalPlayers = 0
    entities.forEach(entity =>{
        if(entity.isPlayer()){
            totalPlayers++
        }
    })
    // event.server.tell('Starting Bossfight with: ' + totalPlayers + ' Players' )
    let baseHealth = entity.getMaxHealth()
    entity.setMaxHealth(baseHealth+(baseHealth*totalPlayers*healthScale))
    entity.setHealth(baseHealth+(baseHealth*totalPlayers*healthScale))

    attributes.forEach(attributeArr => {
        let attribute = attributeArr[0]
        let baseValue = entity.getAttributeBaseValue(attribute)
        let value = baseValue+(attributeArr[1]*totalPlayers)
        entity.setAttributeBaseValue(attribute, value)
    })
}

function deadWitch(event){
    const {entity, level} = event
    const {x,y,z} = entity
    let range = 128
    level.getEntitiesWithin(AABB.of(x - range, y - range, z - range, x + range, y + range, z + range)).forEach(single_player => {
        if (single_player.isPlayer()) {
            title(single_player, "The Dark Witch has been defeated!")
            single_player.tell("She is sealed once again in the Celestial Colosseum")
            single_player.tell("and Arcanum Institute is safe again! For now...")
            single_player.playSound('ftbai:witch_scream')
            Utils.server.runCommandSilent(`execute in minecraft:the_end run tp ${single_player.name.text} -34 58 -2 90 -13.5`)
            Utils.server.runCommandSilent(`ftbquests change_progress ${single_player.name.text} complete 7A184C44A0EA44E2`)
            Utils.server.runCommandSilent(`stopsound ${single_player.name.text} * ftbai:battle_music`)

        }

    })

    event.server.runCommandSilent(`execute in ${level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run kill @e[type=customnpcs:customnpc, distance=..128]`)
    sealHandler(event, entity, "ftbai:sealv2")
    let kuLevel = new Ku.Level(level);
    
    let portal = {
        a: {x: -119, y: 89, z: 2},
        b: {x: -119, y: 106, z: -6}
    }
    event.server.runCommandSilent(`execute in minecraft:the_end run fill ${portal.a.x} ${portal.a.y} ${portal.a.z} ${portal.b.x} ${portal.b.y} ${portal.b.z} ftbai:team_island_portal`)
    kuLevel.spawnStructure(`ftbai:light_relay`, level.getBlock(-113, 59, -1).getPos());
}