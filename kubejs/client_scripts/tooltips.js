onEvent('item.tooltip', (event) => {
    event.addAdvanced('eccentrictome:tome', (item, advanced, text) => {
        eccentricTome(item, text)
    })

    event.add('minecraft:crafting_table', [
        Text.of('Cannot be placed!').red(),
        Text.of('Use the Glyph of Craft instead').gray(),
    ])

    event.add('ars_nouveau:glyph_crush', [
        Text.of('Used on blocks, not items').gray(),
    ])

    event.add('minecraft:gravel', [
        Text.of('Converted from Crackled Cobblestone').gray(),
        Text.of('Made in spiritfire').gray(),
    ])

    event.add('forbidden_arcanus:eternal_stella', [Text.of('Do NOT apply to bloodmagic consumables.').red()])

    event.add([
        'minecraft:furnace',
        'minecraft:blast_furnace',
        'minecraft:smoker',
    ], [
        Text.of('Cannot be placed!').red(),
        Text.of('Use the Glyph of Smelting').gray(),
        Text.of('or Botanic Smelter instead').gray()
    ])

    event.add(
        ['botania:black_lotus', 'botania:blacker_lotus'],
        Text.of('Throw into a non-empty Mana Pool!').gray()
    )

    event.add(/minecraft:.*_hoe/, [
        Text.of('Recipe disabled!').red(),
        Text.of('Use a Wand of the Forest instead!').gray(),
    ])
    event.add('minecraft:snow_block', [
        Text.of('Obtainable by transforming Water').gray(),
        Text.of('with a Pure Daisy').gray(),
    ])
    event.add(['ftbai:silver_coin', 'ftbai:gold_coin'], [
        Text.of('Obtainable by selling mobdrops at').gray(),
        Text.of('Goblin Traders').green(),
    ])
})

function eccentricTome(item, text) {
    if (item.nbt['eccentrictome:mods'].toString() == '{}') {
        text.add(Component.string('Craft with mod books!').gray())
    } else {
        text.add(Component.string('Punch to reset from book').gray())
        text.add(Component.string('Drop while sneaking to remove book.').gray())
    }
}
