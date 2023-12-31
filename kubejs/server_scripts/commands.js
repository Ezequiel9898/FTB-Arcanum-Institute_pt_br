// Teacherlist in constants.js


onEvent('command.registry', event => {
    const { commands: Commands, arguments: Arguments} = event;


    // const teleportClass = (className, pos) => {
    //     console.log(`${className} | x: ${pos.x}, y: ${pos.y}, z: ${pos.z}`);
    //     return Commands.literal('class')
    //         .then(Commands.literal(className)
    //             .executes(ctx => {
    //                 const username = ctx.source.entity.name.text;
    //                 return event.server.runCommandSilent(`execute in minecraft:overworld run teleport ${username} ${pos.x} ${pos.y} ${pos.z}`);
    //             })
    //         );
    // }

    // Object.entries(FTB_AI_CONSTS.tp).forEach(([className, pos]) => event.register(teleportClass(className, pos)));


    // Fix Patchouli Book needing OP
    let command = "open-book"
    event.register(
        Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(event))
                .executes(ctx => {
                    const book =  Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                    const username = ctx.source.entity.name.text;
                    let cmd = `open-patchouli-book ${username} ${book}`
                    return Utils.server.runCommandSilent(cmd);
                })
            )
        )
    event.register(
        Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(event))
        .then(Commands.argument('entry', Arguments.RESOURCE_LOCATION.create(event))
                .executes(ctx => {
                    const book =  Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                    const entry = Arguments.RESOURCE_LOCATION.getResult(ctx, "entry")
                    const username = ctx.source.entity.name.text;
                    let cmd = `open-patchouli-book ${username} ${book} ${entry} 1`
                    return Utils.server.runCommandSilent(cmd);
                })
            )
        ))
    event.register(
        Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(event))
        .then(Commands.argument('entry', Arguments.RESOURCE_LOCATION.create(event))
        .then(Commands.argument('page', Arguments.INTEGER.create(event))
                .executes(ctx => {
                    const book =  Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                    const entry = Arguments.RESOURCE_LOCATION.getResult(ctx, "entry")
                    const page = Arguments.INTEGER.getResult(ctx, "page")
                    const username = ctx.source.entity.name.text;
                    let cmd = `open-patchouli-book ${username} ${book} ${entry} ${page}`
                    return Utils.server.runCommandSilent(cmd);
                })
            )
        )))
    
    const startDungeon = (dungeon, questId) => {
        return Commands.literal('ftbdungeons')
            .then(Commands.literal('create_book')
            .then(Commands.literal(dungeon)
                .executes(ctx => {
                    // Check if the Dependency Quest is complete
                    let quest = getQuestObject(ctx.source.entity.level.asKJS(), questId)
                    const completedQuest = isQuestComplete(ctx.source.entity.asKJS(), quest)
                    if(!completedQuest){ 
                        ctx.source.entity.asKJS().tell("You have not completed the quest to unlock this dungeon!")
                        return 0
                    }

                    // Execute Command
                    const username = ctx.source.entity.name.text;
                    let cmd = `execute as ${username} run ftbdungeons create ${dungeon}`
                    console.log(cmd)
                    return Utils.server.runCommandSilent(cmd);
                })
            ))
    }
    Object.entries(dungeons).forEach(([dungeon, questId]) => event.register(startDungeon(dungeon, questId)));

    // remove FTB Teams; remove all Stages; Reset Questbook; Reset Quests
});

const dungeons = {
    'ftbdungeons:stone': "252E046EBDB11FB1",
    'ftbdungeons:void': "0AC562887EA2FC81",
    'ftbdungeons:elemental': "612BC02EEA4C9BBA",
    'ftbdungeons:occultism': "0",
    'ftbdungeons:arena': "3CA5E2472E0B4E70"

}
