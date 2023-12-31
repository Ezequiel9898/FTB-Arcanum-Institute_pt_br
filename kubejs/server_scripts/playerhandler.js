// priority: 0
// Player Login Events


const specialPlayers = {
    hampushn1: ['botania:cosmetic_cat_ears'],
    saereth: ['botania:cosmetic_engineer_goggles'],
    ladymayhaem: ['botania:cosmetic_pink_flower_bud']
}

onEvent('player.logged_in', (event) => {
    const { player, level } = event
    let pData = player.persistentData

    pData.gameTimer = 0
    pData.dialogueTimer = 0
    pData.inPortal = false
    if (!player.stages.has('disable_command_output')){
        player.stages.add('disable_command_output')
        player.runCommandSilent('gamerule commandBlockOutput false')
    }
    if (!player.stages.has('enable_daylight_cycle')) {
        player.stages.add('enable_daylight_cycle')
        player.runCommandSilent('gamerule doDaylightCycle true')
    }
    
    if (!player.stages.has('first_login')) {
        player.stages.add('first_login')
        player.stages.add('ftbchunks_mapping')
        player.runCommandSilent('spawn')
        player.runCommandSilent(`execute as ${player} run gamemode survival`)
        event.server.scheduleInTicks(10, (event) => {
            player.runCommandSilent(
                `execute as ${player} run gamemode adventure`
            )
        })
        player.runCommandSilent(
            `execute as ${player} run ftbteams party create`
        )
        player.give(
            Item.of(
                'minecraft:bundle',
                '{Items:[{Count:6b,id:"forbidden_arcanus:cherry_peach"},{Count:16b,id:"cnb:apple_slice"},{Count:16b,id:"minecraft:cookie"},{Count:4b,id:"hexcasting:sub_sandwich"}],RepairCost:0,display:{Name:\'{"text":"Lunch Bag"}\'}}'
            )
        )
        if (Object.keys(specialPlayers).includes(player.name.text.toLowerCase())) {
            specialPlayers[player.name.text.toLowerCase()].forEach((item) => {
                player.give(item)
                player.tell(`Welcome ${player.name.text}! To welcome you, we've given you a special item!`)
            })
        }
    }
})

// Player Tick Events
onEvent('player.tick', (event) => {
    const { player, server, level } = event
    let pData = player.persistentData
    let sPData = server.persistentData

    pData.gameTimer++
    //prevents all ofthese update checks from happening too often
    if (pData.gameTimer % 20 != 0) return
    pData.gameTimer = 0

    if (level && player) {
      if (level.dimension == "minecraft:overworld" && !player.potionEffects.isActive("slow_falling")) {
        player.potionEffects.add("slow_falling", 40, 0, true, false);
      }
    }

    // Checks for Teachers/Shops
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.one,
        7,
        'firstshop',
        FTB_AI_CONSTS.shops.questId.one
    )
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.two,
        5,
        'secondShop',
        FTB_AI_CONSTS.shops.questId.two
    )
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.three,
        5,
        'thirdShop',
        FTB_AI_CONSTS.shops.questId.three
    )
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.four,
        5,
        'fourthShop',
        FTB_AI_CONSTS.shops.questId.four
    )
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.food,
        32,
        'foodshop',
        FTB_AI_CONSTS.shops.questId.food
    )
    checkShop(
        event,
        FTB_AI_CONSTS.shops.location.mme,
        24,
        'mme',
        FTB_AI_CONSTS.shops.questId.mme
    )
    checkTeacher(event, [-321, -22, -186], 18, 'BloodMagic', '786E87AD25C9C9D6')
    checkTeacher(event, [-133, -49, -108], 7, 'Ars Nouveau', '59EF764CCD1CAADD')
    checkTeacher(event, [-478, -30, -23], 11, 'Botania', '016AE3BFE56E4C03')
    checkTeacher(event, [-328, -53, -319], 13, `Malum`, '418871AEEAAB853A')
    checkTeacher(event, [-322, -50, -49], 16, 'Hexerei', '2C443D0A7F527025')
    checkTeacher(event, [-321, -48, -186], 16, 'Occultism', '2CBECFD7042E416F')
    checkTeacher(
        event,
        [-233, -23, -138],
        16,
        'Spellcasting',
        '7A8009D1B25A5A01'
    )
    checkTeacher(event, [-123, -25, 15], 16, 'Beastmaster', '5817BE8CA48724DD')

    const portalBlocks = [
        'ftbai:team_island_portal',
        'ftbai:team_island_portal_2',
    ]
    // FTBAI Portal Handler
    if (portalBlocks.includes(player.block.id) && pData.inPortal == false) {
        pData.inPortal = true
        portalBlockHandler(player)
    }
    if (pData.inPortal && !portalBlocks.includes(player.block.id)) {
        pData.inPortal = false
    }

    // Lobby + Death Checker
    if(level.dimension == 'ftbai:dorms' && isNear(player, {x:0, y:3, z:0}, 300)) { 
        let element = false
        Object.entries(FTB_AI_CONSTS.stages).forEach(([key, value]) => { 
            if(player.stages.has(value)) element = true

        })
        if(!element) Utils.server.runCommandSilent(`execute as ${player.name.text} run tp -21 -52 224`)
        else Utils.server.runCommandSilent(`execute as ${player.name.text} run ftbteamislands home`)

    }
    // Dimension Checker
    if (pData?.dimension == undefined)
    pData.dimension = level.dimension.toString()
    if (pData.dimension != level.dimension) {
        gamemodeSwitcher(event)
        pData.dimension = level.dimension
    }

    // Timers
    if (pData.dialogueTimer != 0) pData.dialogueTimer--
})

// Cancel Goblin Trader GUI
onEvent('item.entity_interact', (event) => {
    const { block, item, player, level, server, target, entity } = event
    if (target.type.toString().includes('goblintraders')) {
        event.cancel()
    }
})

// // DEV TOOLS
// onEvent('item.right_click', (event) => {
//     const { block, item, player, level, server, target, entity, hand } = event
//     if (!player.creativeMode) return
//     let commands = []
//     let name
//     switch (item) {
//         case 'minecraft:stick': {
//             let randomElement = getRandomElement()
//             let randomGender = npc.getRandomGender()
//             name = npc.getRandomName(randomGender)

//             let randomNPC = `random_${randomElement}_${randomGender}`
//             commands = [
//                 `npc preset load ${randomNPC}`,
//                 `npc edit movement FREE`,
//                 `npc edit name ${name}`,
//                 `npc deselect`,
//             ]
//             break
//         }
//         case 'minecraft:feather': {
//             commands = ['npc select', 'npc remove']
//             giveElementArmor(event.player, 'fire')
//             break
//         }
//         case 'minecraft:torch': {
//             let element = 'fire'
//             console.log(CosArmorAPI)
//             let CosArmor = CosArmorAPI.getCAStacks(player.id)
//             for (let i in CosArmor) console.log(i)
//             console.log(
//                 CosArmor.getItem(0).toString().split('_boots')[0].split('1 ')[1]
//             )
//             break
//         }
//         case 'minecraft:nether_star': {
//             if (hand != 'OFF_HAND') return
//             if (!player.isCrouching()) return
//             server.runCommandSilent('kubejs reload serverscripts')
//             player.tell('Reloaded Server Scripts')
//             break
//         }
//         case 'minecraft:debug_stick': {
//             player.tell('To change the name type: /npc edit name <name>')
//             commands = [
//                 'npc create',
//                 'npc edit type botania:pixie',
//                 'npc edit look'
//             ]
//             player.tell('Once you are done, type: /npc deselect')
//             break
//         }
//         case "minecraft:iron_sword": {
//             for (let i in Client) console.log(i)
//         }
//     }
//     if (commands.length > 0) {
//         commands.forEach((command) => {
//             player.runCommandSilent(command)
//         })
//     }
// })


function portalBlockHandler(player) {
    if (getPlayerElement(player) == 'none') {
        player.runCommandSilent('ftbteamislands create')
    } else {
        switch (player.level.dimension) {
            case 'ftbai:dorms': {
                const { x, y, z } = FTB_AI_CONSTS.tp.Dorms
                Utils.server.runCommandSilent(
                    `execute as ${player.name.text} in minecraft:overworld run teleport ${x} ${y} ${z}`
                )
                break
            }
            case 'minecraft:overworld': {
                player.runCommandSilent('ftbteamislands home')
                break
            }
            case 'minecraft:the_end': {
                if(!player.stages.has('beaten_witch')){
                    Utils.server.runCommandSilent(`execute as ${player.name.text} run ftbteamislands home`)
                    player.tell(`I feel like i'm not ready to re-seal the witch yet...`)
                    return
                }
                player.sendData('roll_credits', { credits: 1 })
                break
            }
        }
    }
}
