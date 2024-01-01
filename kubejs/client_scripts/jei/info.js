const shopInfo = [
    'minecraft:raw_iron_block',
    'minecraft:raw_gold_block',
    'minecraft:raw_copper_block',
    'minecraft:budding_amethyst',
    'minecraft:totem_of_undying',
    'bloodmagic:sacrificialdagger',
    'bloodmagic:daggerofsacrifice',
    'bloodmagic:simplekey',
    'occultism:book_of_binding_foliot',
    'naturesaura:bottle_two_the_rebottling',
    'evilcraft:dark_ore',
    'eidolon:raw_lead_block',
    'eidolon:raw_silver_block',
]

const questRewards = [
    'ars_nouveau:novice_spell_book',
    'ars_nouveau:apprentice_spell_book',
    'ars_nouveau:archmage_spell_book',
    'ars_nouveau:glyph_craft',
    'ars_nouveau:source_berry',
    'ars_nouveau:glyph_harvest',
    'ars_nouveau:magebloom_crop',
]

const mobDropShop = [
    'minecraft:rotten_flesh',
    'minecraft:bone',
    'minecraft:gunpowder',
    'minecraft:spider_eye',
    'ars_nouveau:wilden_horn',
    'ars_nouveau:wilden_wing',
    'ars_nouveau:wilden_spike',
]

onEvent('jei.information', (event) => {
    event.add(
        ['ftbai:soil', 'botania:pebble'],
        'Sneak right-click Dirt or Grass with an empty hand'
    )

    event.add('botania:twig_wand', [
        'This Wand can be used to till:',
        '- Grass',
        '- Dirt',
        '- Coarse Dirt',
        '- Rooted Dirt',
    ])

    event.add('botania:dreamwood_wand', [
        'This Wand can be used to till a 3x3 of',
        '- Grass',
        '- Dirt',
        '- Coarse Dirt',
        '- Rooted Dirt',
    ])

    event.add(shopInfo, [
        'This item can be obtained in one of the Goblin Shops!',
        ' ',
        'Be sure to find them all!',
    ])

    event.add(questRewards, 'Given as a quest reward')

    event.add(mobDropShop, [
        'Goblin Shops sell Gate Pearls, which spawn waves of mobs.',
        ' ',
        'These mobs drop the items listed!',
    ])

    event.add(
        ['minecraft:shulker_shell'],
        [
            'The Magic Mischief Emporium (located in the courtyard) sells Shulker Gate Pearls!',
            ' ',
            'On use, these spawn waves of Shulkers, which drop Shulker Shells!',
        ]
    )

    event.add(
        'minecraft:iron_ore',
        'Raw Iron can be purchased from one of the Goblin Shops!'
    )
    event.add(
        'minecraft:copper_ore',
        'Raw Copper can be purchased from one of the Goblin Shops!'
    )
    event.add(
        'occultism:silver_ore',
        'Raw Silver can be purchased from one of the Goblin Shops!'
    )

    event.add(
        'rootsclassic:dragons_eye',
        'Has a 10% chance of dropping from Chorus Flowers'
    )

    event.add(
        [
            'minecraft:amethyst_shard',
            'hexcasting:amethyst_dust',
            'hexcasting:charged_amethyst',
        ],
        'Drops from Amethyst Clusters, which grow on Budding Amethyst'
    )

    event.add(
        'minecraft:glowstone_dust',
        'Glowstone blocks can be acquired using the Orechid or Dimensional Mineshaft'
    )

    event.add('minecraft:water_bucket', 'The Hex Casting chapter has a quest explaining how to get water')
    Object.entries(spirits).forEach(([spirit, mobs]) => {
        event.add(`malum:${spirit}_spirit`, `Can be obtained by killing\n\n${mobs.join('\n')}\n\nand many more!`)
    })
})

onEvent('item.tooltip', (tooltip) => {
    tooltip.add(
        shopInfo,
        'This item can be obtained in one of the Goblin Shops'
    )
    tooltip.add(
        'ftbai:wooden_bucket',
        'Crafting Component for Edelwood Water Bucket'
    )
})

const spirits = {
    wicked: ['Zombie', 'Creeper', 'Skeleton', 'Drowned', 'Stray'],
    earthen: ['Zombie', 'Cow'],
    infernal: ['Creeper', 'Blaze' ],
    arcane: ['Creeper', 'Skeleton', 'Blaze', 'Enderman' ],
    sacred: ['Cow', 'Bat', 'All Passive Animals'],
    aqueous: ['Drowned'],
    aerial: ['Bat', 'Stray', 'Chicken'],
    eldritch: ['Enderman']
}