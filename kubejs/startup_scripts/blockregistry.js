let blockstate = JsonIO.read(
    `kubejs/assets/ftbai/blockstates/block/furnace.json`
)
let modelJSON = JsonIO.read(`kubejs/assets/ftbai/models/block/furnace.json`)

onEvent('block.registry', (event) => {
    event.create('ftbai:block_of_flesh').material('slime')

    event
        .create('ftbai:team_island_portal')
        .box(6.0, 0.0, 0.0, 7.0, 16.0, 16.0, true)
        .noCollision()
        .unbreakable()
        .material('portal')
        .textureAll('minecraft:block/nether_portal')
        .renderType('translucent')
        .defaultTranslucent()
        .tagBoth('ftbai:team_portal')

    event
        .create('ftbai:team_island_portal_2')
        .displayName('Team Island Portal')
        .box(0.0, 0.0, 6.0, 16.0, 16.0, 7.0, true)
        .noCollision()
        .unbreakable()
        .material('portal')
        .textureAll('minecraft:block/nether_portal')
        .renderType('translucent')
        .defaultTranslucent()
        .tagBoth('ftbai:team_portal')

    event
        .create('ftbai:fauxhopper')
        .model('minecraft:block/hopper')
        .textureAll('minecraft:block/hopper')
        .renderType('translucent')
        .defaultTranslucent()

    event
        .create('ftbai:blast_furnace')
        .model('minecraft:block/blast_furnace')
        .displayName(`Blast Furnace`)

    const elements = ['Água', 'Ar', 'Fogo', 'Terra']
    elements.forEach((element) => {
        event
            .create(`ftbai:${element}stone`)
            .textureAll(`bloodmagic:block/${element}ritualstone`)
    })

    // event.create('ftbai:furnace')
    // 	.model('ftbai:models/block/furnace')
    // 	.blockstateJson = blockstate
    // 	.property(BlockProperties.FACING)
    // 	.placementState(evt => evt['set(net.minecraft.world.level.block.state.properties.EnumProperty,java.lang.Enum)'](BlockProperties.FACING, evt.getNearestLookingDirections()))
})
