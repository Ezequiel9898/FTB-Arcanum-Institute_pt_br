const cancel_list = [
    'ars_nouveau:arcane_pedestal',
    'malum:spirit_altar',
    'malum:runewood_item_pedestal',
    'malum:spirit_jar',
    /.*door/,
    'minecraft:anvil',
    'minecraft:wheat',
    'minecraft:sweet_berry_bush',
    'minecraft:anvil',
    'minecraft:hopper',
    'minecraft:oak_trapdoor',
    'minecraft:spruce_trapdoor',
    'minecraft:birch_trapdoor',
    'minecraft:jungle_trapdoor',
    'minecraft:acacia_trapdoor',
    'minecraft:dark_oak_trapdoor',
    'minecraft:crimson_trapdoor',
    'signpost:post_stone',
    'signpost:post_spruce'
]

// Overworld interactions
onEvent('block.right_click', (event) => {
    const { block, player, level } = event
    if (!player) return
    if (player.creativeMode) return
    if (level.dimension !== 'minecraft:overworld') return
    if (!block) return

    if (block.id === 'botania:apothecary_default') {
        block.set(block.id, { fluid: 'water' })
    }

    if (cancel_list.includes(block.id)) {
        event.cancel()
    }
})

// Disable Botania Pebbles in overworld
onEvent('block.right_click', (event) => {
    const { block, player, level } = event
    if (!player) return
    if (!block) return

    if (level.dimension === 'ftbai:dorms') return

    if (!block.hasTag('minecraft:dirt')) return

    if (player.crouching) event.cancel()
})

onEvent('block.trample', (event) => event.cancel())

// Fire Sticks
onEvent('block.right_click', (event) => {
    const { block, item, player, server } = event
    const { x, y, z } = block

    if (item.id !== 'firesticks:fire_stick') return

    let aabb = AABB.of(x, y, z, x + 1, y + 2, z + 1)
    let entities = event.level.getEntitiesWithin(aabb)
    entities.forEach((entity) => {
        if (entity.toString().contains("Demon's Dream Fruit")) {
            event.cancel()
            let pos = block.getUp()
            if (pos === 'minecraft:air') {
                let command = `execute in ${
                    player.level.dimension
                } run setblock ${block.x} ${block.y + 1} ${
                    block.z
                } occultism:spirit_fire`
                server.runCommandSilent(command)
                entity.kill()
            }
        }
    })
})


onEvent('level.explosion.pre', event => {
    if (event.level.dimension == 'ftbdungeons:dungeon_dim' || event.level.dimension == 'minecraft:overworld') event.cancel()
})
const breakWhitelist = [
    'minecraft:dirt', 
    'minecraft:torch',
    'ars_nouveau:light_block',
    'minecraft:wall_torch',
    'quark:glowberry_sack',
    'quark:cocoa_beans_sack',
    'minecraft:bookshelf',
    'botania:white_mushroom',
    'supplementaries:urn',
    'supplementaries:sack',
    'quark:beetroot_crate',
    'quark:carrot_crate',
    'quark:potato_crate',
    'minecraft:anvil',
    'minecraft:snow_block',
    'supplementaries:globe_sepia',
    'minecraft:tnt',
    'minecraft:redstone_block',
    'quark:white_corundum_cluster',
    'ars_nouveau:blue_archwood_leaves',
    'minecraft:nether_sprouts',
    'minecraft:crimson_roots',
    'ars_nouveau:red_archwood_leaves',
    'botania:white_shiny_flower',
    'supplementaries:jar',
    'ars_nouveau:red_archwood_leaves',
    'minecraft:crimson_fungus',
    'supplementaries:candle_holder_red',
    'minecraft:vine',
    'ars_nouveau:green_archwood_leaves',
    'hexcasting:akashic_leaves2',
    'minecraft:fern',
    'minecraft:grass',
    'minecraft:cobweb',
    'minecraft:pointed_dripstone',
    'minecraft:lantern',
    'minecraft:amethyst_cluster',
    'minecraft:scaffolding',
    'minecraft:flower_pot',
    'minecraft:candle',
    'minecraft:azalea_leaves',
    'minecraft:hay_block',
    'minecraft:air'
]

// Prevent breaking non whitelisted blocks in dungeons
onEvent('block.break', (event) => {
    const { player, level } = event
    if (player.creativeMode) return
    if (level.dimension !== 'ftbdungeons:dungeon_dim') return
    if (!breakWhitelist.includes(event.block.id)) {
        event.cancel()
    }
})

const placeWhitelist = [
    'minecraft:torch',
    'ars_nouveau:light_block',
    'minecraft:wall_torch',
    'supplementaries:urn',
    'supplementaries:sack',
]
// Prevent placing non whitelisted blocks in dungeons
onEvent('block.place', (event) => {
    const { player, level, entity } = event
    if (!entity) return
    if (!entity.isPlayer()) return
    if (entity.creativeMode) return
    if (level.dimension != 'ftbdungeons:dungeon_dim') return
    if (placeWhitelist.includes(event.block.id)) return
    event.cancel()
})

// Soil and Rocks
const digBlocks = [
    'botania:dry_grass',
    'botania:vivid_grass',
    'minecraft:grass_block',
    'minecraft:dirt',
    'minecraft:coarse_dirt',
    'minecraft:moss_block',
    'antiblocksrechiseled:wool_green',
    'antiblocksrechiseled:wool_lime',
    'botania:infused_grass',
]

onEvent('block.right_click', (event) => {
    const { item, hand, player, block, level } = event

    if (level.dimension != 'ftbai:dorms') return
    if (hand != 'MAIN_HAND') return
    if (item.id != 'minecraft:air') return

    if (!player.crouching) return
    if (!digBlocks.toString().includes(block.id)) return

    var chance = Math.random() * 100

    if (chance < 25) {
        event.block.popItemFromFace('ftbai:soil', Direction.UP)
    }
})

const dirtToFarmland = [
    'minecraft:dirt',
    'minecraft:grass_block',
    'minecraft:coarse_dirt',
    'minecraft:rooted_dirt',
    'minecraft:moss_block',
]
const coarseToDirt = [
    'minecraft:coarse_dirt',
    'minecraft:rooted_dirt'
]
// Hoe using Botania Wands
onEvent('block.right_click', (event) => {
    const { item, hand, block, level, server } = event
    if (level.dimension != 'ftbai:dorms') return
    if (hand != 'MAIN_HAND') return
    let changeBlock
    if (dirtToFarmland.includes(block.id)) changeBlock = 'minecraft:farmland'
    if (coarseToDirt.includes(block.id)) changeBlock = 'minecraft:dirt'
    if (!changeBlock) return
    switch (item.id) {
        case 'botania:twig_wand': {
            block.set(changeBlock)
            server.runCommandSilent(
                `execute in ftbai:dorms run particle minecraft:ambient_entity_effect ${
                    block.x
                } ${block.y + 0.8} ${block.z} 0 0.5 0 0.5 20 force`
            )
            break
        }
        case 'botania:dreamwood_wand': {
            for (let xOffset = -1; xOffset <= 1; xOffset++) {
                for (let zOffset = -1; zOffset <= 1; zOffset++) {
                    let oBlock = level.getBlock(
                        block.x + xOffset,
                        block.y,
                        block.z + zOffset
                    )
                    switch(changeBlock){
                        case 'minecraft:farmland': {
                            if (dirtToFarmland.includes(oBlock.id)) {
                                oBlock.set(changeBlock)
                                server.runCommandSilent(
                                    `execute in ftbai:dorms run particle minecraft:ambient_entity_effect ${
                                        oBlock.x
                                    } ${oBlock.y + 0.8} ${
                                        oBlock.z
                                    } 0 0.5 0 0.5 20 force`
                                )
                            }
                            break
                        }
                        case 'minecraft:dirt': {
                            if (coarseToDirt.includes(oBlock.id)) {
                                oBlock.set(changeBlock)
                                server.runCommandSilent(
                                    `execute in ftbai:dorms run particle minecraft:ambient_entity_effect ${
                                        oBlock.x
                                    } ${oBlock.y + 0.8} ${
                                        oBlock.z
                                    } 0 0.5 0 0.5 20 force`
                                )
                            }
                            break
                        }
                    }
                }
            }
        }
    }
})

// Read Mana Pool
onEvent('block.right_click', (event) => {
    const { hand, player, block, level } = event
    if (level.dimension != 'ftbai:dorms') return
    if (hand != 'MAIN_HAND') return
    if (block.id != 'botania:mana_pool') return

    actionbar(player.name.text, `Mana: ${block.entityData.mana}`)
})

// Cancel Blockbreaking at all cost in the Overworld
onEvent('block.break', (event) => {
    const { level, player } = event
    if (!player) return
    if (
        level.dimension != 'minecraft:overworld' &&
        level.dimension != 'minecraft:the_end'
    ) {
        return
    }

    if (player.creativeMode) return
    event.cancel()
})

//FIXME: Causes inventory desync if the event is canceled.
onEvent('block.place', (event) => {
    const { level, block } = event

    const player = event.entity
    if (!player) return
    if (!player.isPlayer()) return

    if (player.creativeMode) return
    if (level.dimension === 'minecraft:overworld') return

    if (blocksThatCantBePlaced.includes(block.id)) {
        player.tell(Text.of("This block can't be placed!").red())
        event.cancel()
    }
})

onEvent('block.right_click', (event) => {
    if (blocksThatCantBePlaced.includes(event.block.id))
        event.block.set('minecraft:air')
})

const blocksThatCantBePlaced = [
    'minecraft:crafting_table',
    'minecraft:furnace',
    'minecraft:blast_furnace',
    'minecraft:smoker',
]
