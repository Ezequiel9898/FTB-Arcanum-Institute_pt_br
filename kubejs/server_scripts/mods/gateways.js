onEvent('recipes', event => {
    event.remove({mod: 'gateways'})

    event.shaped(Item.of('gateways:gate_pearl', '{gateway:"gateways:blaze_gate_small"}'), [' B ','BEB', ' B '], {
        B: 'rootsclassic:infernal_bulb',
        E: 'minecraft:ender_pearl'
    }).id('gateways:blaze_gate_small')
    event.shaped(Item.of('gateways:gate_pearl', '{gateway:"gateways:enderman_gate_small"}'), ['ABA','BCB','ABA'], {A: 'quark:chorus_fruit_block',B: 'rootsclassic:dragons_eye',C: 'minecraft:ender_eye'})
})



onEvent('item.right_click', event =>{
    const {item, player, level, server, hand} = event
    if(!item.id.includes('gateways:gate')) return
    if (hand != "MAIN_HAND") return
    const biome = player.block.biomeId
    let errorMsg
    switch(item.nbt.gateway){
        case 'gateways:blaze_gate_small':{
            if (biome != 'ftbai:dorms'){
                errorMsg = 'This Gateway only wants to form in your Dorm'
                actionbar(player.name.text, errorMsg)
                event.cancel()
                return
            }
        }

        default: {
            if(biome == 'ftbai:school') {
                errorMsg = 'The Gateway won\'t form in School'
                actionbar(player.name.text, errorMsg)
                event.cancel()
                return
            }
        }
    }
    // const command = `execute in ${player.level.dimension} run open_gateway ${Math.floor(player.x)} ${Math.floor(player.y)} ${Math.floor(player.z)} ${item.nbt.gateway}`
    // player.server.runCommand(command)
    // item.count--
})

onEvent('block.right_click', event =>{
    const {item, player, level} = event
    if(!item.id.includes('gateways:gate')) return
    if(level.dimension != 'minecraft:overworld') return
    const biome = player.block.biomeId
    let errorMsg


    switch(item.nbt.gateway){
        case 'gateways:blaze_gate_small':{
            if (biome != 'ftbai:dorms'){
                errorMsg = 'This Gateway only wants to form in your Dorm'
                actionbar(player.name.text, errorMsg)
                event.cancel()
                break
            }
        }

        default: {
            if(biome == 'ftbai:school') {
                errorMsg = 'The Gateway won\'t form in School'
                actionbar(player.name.text, errorMsg)
                event.cancel()
                break
            }
        }
    }
})