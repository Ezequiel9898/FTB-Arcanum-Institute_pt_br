let itemsToAdd = [
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops a location Vector and,","italic":false,"color":"gray"}]\',\'[{"text":"if there\\\'s a sapling there,","italic":false,"color":"gray"}]\',\'[{"text":"grows an Edified Tree","italic":false,"color":"gray"}]\'],Name:\'{"text":"Cast Edify Sapling Spell"}\'},pattern:{angles:[B;0B,5B,4B,5B,0B,2B],start_dir:0b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops a location Vector, and","italic":false,"color":"gray"}]\',\'[{"text":"either places a water source or","italic":false,"color":"gray"}]\',\'[{"text":"fills a tank with up to 1000mb of water","italic":false,"color":"gray"}]\'],Name:\'{"text":"Cast Water Spell"}\'},pattern:{angles:[B;4B,5B,4B,0B,5B,4B,2B,4B,5B],start_dir:2b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops either a dropped item Entity, or","italic":false,"color":"gray"}]\',\'[{"text":"the location Vector of a block,","italic":false,"color":"gray"}]\',\'[{"text":"then smelts it","italic":false,"color":"gray"}]\'],Name:\'{"text":"Cast Smelt Spell"}\'},pattern:{angles:[B;0B,5B,5B,5B,0B,5B,5B,4B,2B,4B,2B],start_dir:1b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pushes a Vector of [0,1,0].","italic":false,"color":"gray"}]\',\'[{"text":"For example, when used as a","italic":false,"color":"gray"}]\',\'[{"text":"look-direction Vector, this points up","italic":false,"color":"gray"}]\'],Name:\'{"text":"[0,1,0] Vector"}\'},pattern:{angles:[B;5B,5B,5B,5B,5B,1B,0B],start_dir:5b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops a location Vector and","italic":false,"color":"gray"}]\',\'[{"text":"a look-direction Vector, and","italic":false,"color":"gray"}]\',\'[{"text":"pushes the Entity being looked at","italic":false,"color":"gray"}]\'],Name:\'{"text":"Scout\\\'s Distillation"}\'},pattern:{angles:[B;0B,1B,4B,5B,4B],start_dir:1b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops an entity and pushes","italic":false,"color":"gray"}]\',\'[{"text":"the direction it\\\'s looking","italic":false,"color":"gray"}]\',\'[{"text":"as a Vector","italic":false,"color":"gray"}]\'],Name:\'{"text":"Alidade\\\'s Purification"}\'},pattern:{angles:[B;0B,4B],start_dir:0b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops a location Vector and","italic":false,"color":"gray"}]\',\'[{"text":"a look-direction Vector, and","italic":false,"color":"gray"}]\',\'[{"text":"pushes the side of the block","italic":false,"color":"gray"}]\',\'[{"text":"that\\\'s being aimed at","italic":false,"color":"gray"}]\'],Name:\'{"text":"Architect\\\'s Distillation"}\'},pattern:{angles:[B;0B,5B,4B,4B,0B,2B,2B],start_dir:1b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pushes the caster as","italic":false,"color":"gray"}]\',\'[{"text":"an Entity to the Stack","italic":false,"color":"gray"}]\'],Name:\'{"text":"Compass\\\' Purification"}\'},pattern:{angles:[B;4B,4B],start_dir:1b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pops an Entity and pushes","italic":false,"color":"gray"}]\',\'[{"text":"a Vector of its coordinates","italic":false,"color":"gray"}]\'],Name:\'{"text":"Compass\\\' Purification"}\'},pattern:{angles:[B;4B,4B],start_dir:1b}}'
    ),
    Item.of(
        'hexcasting:scroll_small',
        '{RepairCost:0,display:{Lore:[\'[{"text":"","italic":false,"color":"gray"}]\',\'[{"text":"Pushes the caster as","italic":false,"color":"gray"}]\',\'[{"text":"an Entity to the Stack","italic":false,"color":"gray"}]\'],Name:\'{"text":"Mind\\\'s Reflection"}\'},pattern:{angles:[B;5B,4B,5B],start_dir:0b}}'
    ),
]

onEvent('jei.add.items', (event) => {
    event.add(itemsToAdd)
})
