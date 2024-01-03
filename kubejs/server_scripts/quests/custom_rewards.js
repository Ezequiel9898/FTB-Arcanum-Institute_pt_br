onEvent('ftbquests.custom_reward', (event) => {
    let element

    switch (event.reward.toString()) {
        case FTB_AI_CONSTS.rewardId.fireArmor: {
            element = 'fire'
            break
        }
        case FTB_AI_CONSTS.rewardId.waterArmor: {
            element = 'aqua'
            break
        }
        case FTB_AI_CONSTS.rewardId.airArmor: {
            element = 'air'
            break
        }
        case FTB_AI_CONSTS.rewardId.earthArmor: {
            element = 'earth'
            break
        }
        case FTB_AI_CONSTS.rewardId.arsTree:
            giveTree(event.player)
            break
        case FTB_AI_CONSTS.rewardId.elementTome:
            giveTome(event.player)
            break
        case '6D36AABFF74E02C3':
            toggleMobNerf(event.player)
    }
    if (element) giveElementArmor(event.player, element)
})
