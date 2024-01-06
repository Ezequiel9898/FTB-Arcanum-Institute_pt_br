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
        'Pressione Shift + clique direito em uma Terra ou Grama estando com a mão vazia'
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
        'Este item pode ser obtido em uma das Lojas dos Goblins!',
        ' ',
        'Certifique-se de encontrar todos eles!',
    ])

    event.add(questRewards, 'Given as a quest reward')

    event.add(mobDropShop, [
        'As Lojas dos Goblins vendem Pérolas de Portal, que invocam ondas de mobs.',
        ' ',
        'Esses mobs dropam os itens listados!',
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
        'Ferro Bruto pode ser comprado em uma das Lojas dos Goblins!'
    )
    event.add(
        'minecraft:copper_ore',
        'Cobre Bruto pode ser comprado em uma das Lojas dos Goblins!'
    )
    event.add(
        'occultism:silver_ore',
        'Prata Bruta pode ser adquirida em uma das Lojas dos Goblins!'
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
        'Este item pode ser obtido em uma das Lojas dos Goblins'
    )
    tooltip.add(
        'ftbai:wooden_bucket',
        'Componente de fabricação para o Balde de Madeira Ancestral com Água'
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
