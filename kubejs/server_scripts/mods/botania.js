const $Orechid = java(
    'vazkii.botania.common.block.subtile.functional.SubTileOrechid'
)

onEvent('block.right_click', (event) => {
    const { player, block } = event

    if (block.id == 'botania:light_relay') onClickLightRelay(player, block)
})

const UNBOUND_LUMINIZER_Y = -2.147483648e9
function onClickLightRelay(player, block) {
    const boundY = block?.entityData?.bindY ?? UNBOUND_LUMINIZER_Y
    const isUnbound = boundY == UNBOUND_LUMINIZER_Y

    console.log(isUnbound)
    if (isUnbound) {
        player.tell(
            "This Luminizer doesn't go anywhere! It's the exit, not an entrance!"
        )
    }
}

onEvent('recipes', (event) => {
    const mana_infusion = event.recipes.botania.mana_infusion
    const pure_daisy = event.recipes.botania.pure_daisy
    const orechid = event.recipes.botania.orechid

    // Remove by ID
    const removeBotaniaId = [
        'botania:fertilizer_dye',
        'botania:mana_spreader',
        'botania:runic_altar/earth',
        'botania:mana_infusion/wheat_seeds_to_potato',
        'botania:petal_apothecary/orechid',
        'botania:orechid/coal_ore',
        'botania:orechid/iron_ore',
        'botania:orechid/redstone_ore',
        'botania:orechid/copper_ore',
        'botania:orechid/gold_ore',
        'botania:orechid/emerald_ore',
        'botania:orechid/lapis_ore',
        'botania:orechid/diamond_ore',
        'botania:orechid/deepslate_coal_ore',
        'botania:orechid/deepslate_iron_ore',
        'botania:orechid/deepslate_lapis_ore',
        'botania:orechid/deepslate_redstone_ore',
        'botania:orechid/deepslate_copper_ore',
        'botania:orechid/deepslate_gold_ore',
        'botania:orechid/deepslate_emerald_ore',
        'botania:orechid/deepslate_lapis_ore',
        'botania:orechid/deepslate_diamond_ore',
        'gardenofglass:end_portal_frame',
        'gardenofglass:root_to_fertilizer',
    ]
    removeBotaniaId.forEach((id) => {
        event.remove({ id: id })
    })

    // Orechid
    const orechidStoneOres = [
        ['minecraft:cobblestone', 31],
        ['minecraft:coal_ore', 24],
        ['minecraft:iron_ore', 8],
        ['minecraft:redstone_ore', 4],
        ['minecraft:copper_ore', 2],
        ['minecraft:gold_ore', 2],
        ['minecraft:lapis_ore', 5],
        ['evilcraft:dark_ore', 1],
        ['occultism:silver_ore', 5],
        ['malum:natural_quartz_ore', 5],
        ['malum:soulstone_ore', 5],
        ['malum:block_of_cthonic_gold', 1],
    ]
    orechidStoneOres.forEach((oreArr) => {
        let ore = oreArr[0]
        let weight = oreArr[1]
        orechid(ore, 'minecraft:stone', weight).id(
            `botania:orechid/stone_${ore.split(':')[1]}`
        )
    })
        // Orechid
        const orechidLivingOres = [
            ['botania:livingrock', 40],
            ['minecraft:coal_ore', 26],
            ['minecraft:glowstone', 15],
            ['minecraft:iron_ore', 8],
            ['minecraft:copper_ore', 7],
            ['minecraft:redstone_ore', 4],
        ]
        orechidLivingOres.forEach((oreArr) => {
            let ore = oreArr[0]
            let weight = oreArr[1]
            orechid(ore, 'botania:livingrock', weight).id(
                `botania:orechid/livingrock_${ore.split(':')[1]}`
            )
        })

    // Pure Daisy
    pure_daisy('botania:livingrock', 'minecraft:cobblestone').id(
        'ftbai:cobble_to_livingrock'
    )
    pure_daisy('minecraft:snow_block', 'minecraft:water').id(
        'fbtai:water_to_snow'
    )
    pure_daisy('minecraft:ice', 'minecraft:snow_block').id('ftbai:snow_to_ice')
    pure_daisy('quark:chorus_weeds', 'minecraft:purpur_block')
    pure_daisy('minecraft:sand', 'minecraft:gravel').id('ftbai:gravel_to_sand')
    
    // Mana-Pool
    mana_infusion('botania:mana_diamond', 'ars_nouveau:source_gem', 20000).id(
        'ftbai:source_gem_to_mana_diamond'
    )
    mana_infusion(
        'ars_nouveau:blue_archwood_sapling',
        'ars_nouveau:purple_archwood_sapling',
        10000,
        'ars_nouveau:relay'
    ).id('ftbai:purple_to_blue')
    mana_infusion(
        'ars_nouveau:purple_archwood_sapling',
        'ars_nouveau:green_archwood_sapling',
        10000,
        'ars_nouveau:relay'
    ).id('ftbai:green_to_purple')
    mana_infusion(
        'ars_nouveau:green_archwood_sapling',
        'ars_nouveau:red_archwood_sapling',
        10000,
        'ars_nouveau:relay'
    ).id('fbtai:red_to_green')
    mana_infusion(
        'ars_elemental:yellow_archwood_sapling',
        'ars_nouveau:blue_archwood_sapling',
        10000,
        'ars_nouveau:relay'
    ).id('ftbai:blue_to_yellow')
    mana_infusion(
        'ars_nouveau:red_archwood_sapling',
        'ars_elemental:yellow_archwood_sapling',
        10000,
        'ars_nouveau:relay'
    ).id('ftbai:yellow_to_red')
    mana_infusion(
        'minecraft:kelp',
        'minecraft:wheat_seeds',
        1000,
        'botania:alchemy_catalyst'
    ).id('botania:wheat_seeds_to_kelp')
    mana_infusion(
        'minecraft:potato',
        'minecraft:kelp',
        1000,
        'botania:alchemy_catalyst'
    ).id('botania:kelp_to_potato')
    mana_infusion(
        '4x minecraft:magma_cream',
        'minecraft:magma_block',
        2000,
        'botania:alchemy_catalyst'
    ).id('ftbai:magma_cream')
    mana_infusion('forbidden_arcanus:edelwood_water_bucket', 'ftbai:wooden_bucket', 10000).id('ftbai:edelwood_bucket')
    mana_infusion('minecraft:leather', 'forbidden_arcanus:bat_wing', 1000).id('ftbai:botania/batwing_to_leather')
    colors.forEach((color) => {
        event.recipes.botania
            .mana_infusion(
                `botania:${color}_mushroom`,
                `botania:${color}_mystical_flower`,
                10000,
                'ars_nouveau:relay'
            )
            .id(`ftbai:${color}_mushroom`)
    })

    mana_infusion('2x malum:processed_soulstone', 'malum:raw_soulstone', 200).id('ftbai:botania/processed_soulstone')
    mana_infusion('2x malum:processed_soulstone', 'malum:soulstone_ore', 200).id('ftbai:botania/processed_soulstone_from_ore')
    mana_infusion('minecraft:soul_soil', 'minecraft:soul_sand', 200, 'botania:alchemy_catalyst').id('ftbai:botania/soul_sand')
    mana_infusion('minecraft:bee_spawn_egg', 'iceandfire:rotten_egg', 5000, 'botania:alchemy_catalyst').id('ftbai:botania/rotten_egg')
    // Runic Altar
    event.recipes.botania
        .runic_altar(
            'botania:rune_earth',
            [
                'minecraft:stone',
                '#forge:mushrooms',
                'quark:charcoal_block',
                'botania:manasteel_ingot',
                'botania:mana_powder',
            ],
            5000
        )
        .id('botania:runic_altar/earth')
    // Shaped - Shapeless
    event.shaped('botania:mana_spreader', ['LLL', 'AP ', 'LLL'], {
        L: '#botania:livingwood_logs',
        A: 'minecraft:amethyst_shard',
        P: '#botania:petals',
    })

    event
        .custom({
            type: 'botania:gog_alternation',
            base: {
                type: 'botania:petal_apothecary',
                ingredients: [
                    {
                        tag: 'botania:petals/gray',
                    },
                    {
                        tag: 'botania:petals/gray',
                    },
                    {
                        tag: 'botania:petals/yellow',
                    },
                    {
                        tag: 'botania:petals/green',
                    },
                    {
                        tag: 'botania:petals/red',
                    },
                    {
                        item: 'botania:rune_pride',
                    },
                    {
                        item: 'botania:rune_greed',
                    },
                    {
                        item: 'botania:redstone_root',
                    },
                    {
                        item: 'botania:pixie_dust',
                    },
                ],
                output: {
                    item: 'botania:orechid',
                },
                reagent: {
                    tag: 'botania:seed_apothecary_reagent',
                },
            },
            gog: {
                type: 'botania:petal_apothecary',
                ingredients: [
                    {
                        tag: 'botania:petals/gray',
                    },
                    {
                        tag: 'botania:petals/gray',
                    },
                    {
                        tag: 'botania:petals/yellow',
                    },
                    {
                        tag: 'botania:petals/yellow',
                    },
                    {
                        tag: 'botania:petals/green',
                    },
                    {
                        tag: 'botania:petals/green',
                    },
                    {
                        tag: 'botania:petals/red',
                    },
                    {
                        tag: 'botania:petals/red',
                    },
                    {
                        item: 'botania:rune_mana',
                    },
                ],
                output: {
                    item: 'botania:orechid',
                },
                reagent: {
                    tag: 'botania:seed_apothecary_reagent',
                },
            },
        })
        .id('botania:petal_apothecary/orechid')

        event.replaceInput({type: 'minecraft:crafting_shaped'},"botania:fertilizer", 'minecraft:bone_meal')
        mana_infusion('minecraft:spore_blossom', 'minecraft:flowering_azalea', 10000, 'botania:alchemy_catalyst').id('ftbai:botania/azalea_to_spore_blossom')
        event.remove({id: 'botania:mining_ring'})
        event.shaped('botania:mining_ring', ['RIP', 'I I', ' I '], {
            R: 'botania:rune_earth',
            I: 'botania:manasteel_ingot',
            P: 'botania:manasteel_pick'
        }).id('botania:mining_ring')
})
