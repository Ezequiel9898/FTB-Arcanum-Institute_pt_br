onEvent('item.entity_interact', (event) => {
    const { target, hand, player } = event

    if (hand != 'MAIN_HAND') return
    if (target.type != 'taterzens:npc') return

    let name = target.customName.text
    let tpData = target.persistentData


    Object.keys(codex_stages).forEach((key) => {
        if (name == key && player.stages.has(codex_stages[key])) {
            let index = player.inventory.find(`ftbai:${codex_stages[key]}`)
            if(index != -1) return
            player.tell(`Você perdeu seu Codex? Aqui, pegue um novo!`)
            player.give(`ftbai:${codex_stages[key]}`)
            return
        }
    })

    if (isSpecialDialogue(name)) {
        doSpecialDialogue(event, name)
        return
    }


    if (tpData?.random == 1) {
        npc.dialog(event, name, true)
    } else if (tpData?.goblin == 1) {
        let dice = Math.floor(Math.random() * 100)
        if (dice < 50) {
            npc.dialog(event, 'Goblin', false)
        } else npc.dialog(event, 'Goblin2', false)
        player.server.runCommandSilent(
            `execute as ${player.name.text} run ftbquests open_book ${goblinNames[target.customName.text]}`
        )
    } else {
        npc.dialog(event, name, false)
    }
})
const goblinNames = {
    Haaznek: '619CD05EC09EC8B4',
    Ibseang: '512C6E629FD19B23',
    Brobzagz: '1CBE9AA80BBD1066',
    Zruzz: '79BE594F4EAE956B'
}
const npc = {
    dialog: function (event, npc, isRandom) {
        const { player } = event
        let pData = player.persistentData
        if (pData.dialogueTimer != 0) return

        const possibleDialogue = !isRandom
            ? dialogues[npc]
            : dialogues['Student']

        if (possibleDialogue == undefined) {
            possibleDialogue = dialogues['Student']
            
            // error_report(player, `No Lines yet implemented for ${npc}`)
            // pData.dialogueTimer = 2
            // return
        }

        const randomIndex = Math.floor(Math.random() * possibleDialogue.length)
        const randomSentence = possibleDialogue[randomIndex]
        if(npc == "Goblin2") {
            let otherGoblins = Object.keys(goblinNames)
            otherGoblins.splice(otherGoblins.indexOf(event.target.customName.text), 1)
            const randomName = otherGoblins[Math.floor(Math.random() * otherGoblins.length)]
            player.tell(`<${event.target.customName.text}> ${randomSentence.replace("GoblinName", randomName)}`)
            pData.dialogueTimer = 2
            return
        }

        player.tell(`<${event.target.customName.text}> ${randomSentence}`)
        pData.dialogueTimer = 2
    },
    getRandomName: function (gender) {
        let randomInt = Math.floor(Math.random() * names[gender].length)
        return names[gender][randomInt]
    },
    getRandomGender: function () {
        let randomInt = Math.floor(Math.random() * 2)
        switch (randomInt) {
            case 0:
                return 'male'
            case 1:
                return 'female'
        }
    },
}

const codex_stages = {
    "R3GEN": "codex_arsnouveau",
    "Prof. Saereth": "codex_bloodmagic",
    "LadyMaehem": "codex_botania",
    "Aaronhowser1": "codex_evilcraft",
    "Lonezstar": "codex_malum",
    "Everlipse": "codex_occultism",
    "TheonlyTazz": "codex_final"
}