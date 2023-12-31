onEvent('ftbquests.custom_task.07BC2A91C95DCEF3', (event) => {
    event.setMaxProgress(1)
})

onEvent('entity.hurt', (event) => {
    let player = event.entity
    let source = event.source

    if (player == null || source == null || source.getActual() == null) return

    if (
        !player.isPlayer() ||
        source.getActual().getType() != 'evilcraft:vengeance_spirit'
    ) {
        return
    }

    setQuestProgress(
        player,
        getQuestObject(player.level, '07BC2A91C95DCEF3'),
        1
    )

    let pData = player.persistentData

    if (!pData.vengeanceHits) pData.vengeanceHits = 0
    if (pData.vengeanceHits >= 10) return
    pData.vengeanceHits = pData.vengeanceHits + 1

    if ([0, 1, 3, 7, 9].includes(pData.vengeanceHits)) {
        player.tell(
            "You've been hit by a Vengeance Spirit! See the EvilCraft questline!"
        )
    }
})
