const specialDialogues = {
    Fisherman: null,
    TheonlyTazz: '5A666790188D5ACA',
    LadyMaehem: '4339E4F7236D2091',
    Loneztar: '00894E8821E62449',
    R3GEN: '0CF0DB4C6B3419C2',
    Everlipse: `5195093F6886F0F3`,
    aaronhowser1: '458348F2C81B8D6B',
    Sunekaer: '6347557FC6E5D7D1',
    Jake_Evans: '60CB78F73F0B9016',
    Saereth: '0E0C6473FEBC9E99',
}

function isSpecialDialogue(name) {
    for (const [key, value] of Object.entries(specialDialogues)) {
        if (key == name) return true
    }

    return false
}

function doSpecialDialogue(event, name) {
    const { player } = event

    if (name == 'Fisherman') {
        fishermanDialog(event)
        return
    }

    let questId = specialDialogues[name]
    let gamestage = `spoken_to_${name}`

    if (!questId || player.stages.has(gamestage)) {
        npc.dialog(event, name, false)
        return
    }

    player.server.runCommandSilent(
        `execute as ${player.name.text} run ftbquests open_book ${questId}`
    )
    player.stages.add(gamestage)
}

function fishermanDialog(event) {
    const { player } = event

    if (player.stages.has('fairy_obtained')) {
        npc.dialog(event, 'Fisherman', false)
        return
    }

    player.tell(
        `<Fisherman> Yo! ${player.name.text}! You seem to be in a heap of trouble, but this is all I can give you.`
    )

    player.stages.add('fairy_obtained')
    player.give('minecraft:totem_of_undying')

    player.persistentData.dialogueTimer = 2
}
