const bossMobs = {
    'minecraft:wither': {
        title: 'Stone Dungeon Cleared',
        subtitle: 'Sending you back in 20 Seconds!',
        reward: null,
        taskId: '40F95905AFE48226',
    },
    'mowziesmobs:ferrous_wroughtnaut': {
        title: 'Stone Dungeon Cleared',
        subtitle: 'Sending you back in 20 Seconds!',
        reward: null,
        taskId: null,
    },
    'ars_nouveau:wilden_guardian': {
        title: 'Wilden Guardian Killed!',
        subtitle: 'Sending you back in 20 Seconds!',
        reward: null,
        taskId: '0A00010517814C16',
    },
    "iceandfire:dread_lich": {
        title: 'Dread Lich Killed!',
        subtitle: 'Sending you back in 20 Seconds!',
        reward: null,
        taskId: "5F85306B432554E9",
    },
    'botania:doppleganger': {
        title: 'Gaia Killed!',
        subtitle: 'Sending you back in 20 Seconds!',
        reward: null,
        taskId: null,
    },
}

onEvent('entity.check_spawn', (event) => {
    const { entity, server, level } = event
    if (level.dimension != 'ftbdungeons:dungeon_dim') return

    if (entity.type == 'supplementaries:falling_urn') event.cancel();
    
    if (entity.y >= 70) {
        // console.log(`${entity.type} spawned at ${entity.x}, ${entity.y}, ${entity.z}`)
        if (entity.type == 'minecraft:creeper') event.cancel()
        entity.setPosition(entity.x, entity.y - 10, entity.z)
    } //event.cancel()
})

// Trigger Boss Spawn Event
onEvent('block.right_click', (event) => {
    const { block, player, level, server, item } = event

    if(level.dimension != 'ftbdungeons:dungeon_dim') return

    switch (block.id) {
        // Void
        case 'malum:twisted_rock_item_pedestal': {
            event.cancel()
            block.set('minecraft:air')
            block.down.set('minecraft:air')
            block.up.set('minecraft:air')
            server.runCommandSilent(
                `execute in ${level.dimension} run summon minecraft:wither ${block.x} ${block.y} ${block.z} {Invul: 202}`
            )
            break
        }
        // Elemental
        case 'ars_nouveau:arcane_pedestal': {
            event.cancel()
            level
                .getEntitiesWithin(
                    AABB.of(
                        block.x - 20,
                        block.y - 20,
                        block.z - 20,
                        block.x + 20,
                        block.y + 20,
                        block.z + 20
                    )
                )
                .forEach((entity) => {
                    if (entity.isPlayer()) {
                        let distance = entity.getDistance(
                            block.x,
                            block.y,
                            block.z
                        )
                        distance = 20 - distance
                        distance = (distance / 20) * 2
                        entity.sendData('screenshake', {
                            i1: distance * 0.6,
                            i2: distance,
                            i3: distance * 0.2,
                            duration: 15,
                        })
                    }
                })
            server.scheduleInTicks(5, (event) => {
                block.set('minecraft:air')
            })
            server.runCommandSilent(
                `execute in ${level.dimension} run open_gateway ${block.x} ${block.y-1} ${block.z} gateways:ars_dungeon`
            )
            break
        }
        // Stone
        case 'ars_nouveau:archwood_chest': {
            level
                .getEntitiesWithin(
                    AABB.of(
                        block.x - 20,
                        block.y - 20,
                        block.z - 20,
                        block.x + 20,
                        block.y + 20,
                        block.z + 20
                    )
                )
                .forEach((entity) => {
                    if (entity.isPlayer()) {
                        let distance = entity.getDistance(
                            block.x,
                            block.y,
                            block.z
                        )
                        distance = 20 - distance
                        distance = (distance / 20) * 2
                        entity.sendData('screenshake', {
                            i1: distance * 0.6,
                            i2: distance,
                            i3: distance * 0.2,
                            duration: 15,
                        })
                    }
                })
            server.scheduleInTicks(5, (event) => {
                block.set('minecraft:air')
                block.down.set('minecraft:air')
            })
            server.scheduleInTicks(20, (event) => {
                let entity = level.createEntity(
                    'mowziesmobs:ferrous_wroughtnaut'
                )
                entity.x = block.x + 0.5
                entity.y = block.y - 1
                entity.z = block.z + 0.5
                entity.spawn()
            })
            break
        }
        // Occultism
        case 'quark:nether_brick_chest':{
            event.cancel()
            level
                .getEntitiesWithin(
                    AABB.of(
                        block.x - 20,
                        block.y - 20,
                        block.z - 20,
                        block.x + 20,
                        block.y + 20,
                        block.z + 20
                    )
                )
                .forEach((entity) => {
                    if (entity.isPlayer()) {
                        let distance = entity.getDistance(
                            block.x,
                            block.y,
                            block.z
                        )
                        distance = 20 - distance
                        distance = (distance / 20) * 2
                        entity.sendData('screenshake', {
                            i1: distance * 0.6,
                            i2: distance,
                            i3: distance * 0.2,
                            duration: 15,
                        })
                    }
                })
            server.scheduleInTicks(5, (event) => {
                block.set('minecraft:air')
                block.down.set('minecraft:air')
            })
            server.runCommandSilent(
                `execute in ${level.dimension} run summon iceandfire:dread_lich ${block.x} ${block.y} ${block.z}`
            )
            break
        }
        
    }
})

// Boss Death Event
onEvent('entity.death', (event) => {
    const { entity, server, level } = event

    if(level.dimension != 'ftbdungeons:dungeon_dim') return
    if (!Object.keys(bossMobs).includes(entity.type)) return

    let boss = bossMobs[entity.type]
    // console.log(boss.taskId)
    let aabb = AABB.of(
        entity.x - 250,
        entity.y - 20,
        entity.z - 250,
        entity.x + 250,
        entity.y + 25,
        entity.z + 250
    )
    let entities = level.getEntitiesWithin(aabb)
    let players = []
    let items = []

    entities.forEach((ent) => {
        if (ent.isPlayer()) {
            players.push(ent)
            title(ent.name.text, boss.title)
            subtitle(ent.name.text, boss.subtitle)
            ent.persistentData.dungeonCleared = true
            if (boss.reward !== null) {
                reward(ent, boss.reward)
            }
            if (boss.taskId !== null) {
                let cmd = `ftbquests change_progress ${ent.name.text} complete ${boss.taskId}`
                console.log(cmd)
                server.runCommand(cmd)
            }
        } else if (ent.getItem() !== null) {
            items.push(ent)
        } else if (boss == 'iceandfire:dread_lich' && ent.type.contains('iceandfire')) {
            Utils.scheduleInTicks(10, () =>{
                ent.kill()
            })
        }
    })

    const firstPlayer = players[0]

    if (firstPlayer !== null) {
        items.forEach((itemStack) => {
            itemStack.setX(firstPlayer.x)
            itemStack.setY(firstPlayer.y)
            itemStack.setZ(firstPlayer.z)
        })
    }

    server.scheduleInTicks(400, (event) => {
        players.forEach((player) => {
            title(player.name.text, 'Sending you back now!')
            player.persistentData.dungeonCleared = false
        })
        server.runCommand(
            `execute as ${players[0].name.text} run ftbdungeons complete`
        )
    })
})

function reward(entity, reward) {
    reward.forEach((item) => {
        entity.give(item)
    })
}
