var Thread = Java.type("java.lang.Thread")
var elements = ["earth", "fire", "water", "air"]
var AbilityAttemptTime = 2
var spawn = {x:-39, y: 59, z:-2}
var phaseThreshold = {}
var Colors = {
    fire: 16711680,
    water: 4697343,
    earth: 6014771,
    air: 16771505

}

function init(event){
    var npc = event.npc
    var storedData = npc.getStoreddata()
    storedData.put("attacking", "false")
    storedData.put("phase", 1)
    storedData.put("invulnerable", "false")
    var element = setElement(npc)
    npc.setHome(spawn.x, spawn.y, spawn.z)
    npc.setPosition(spawn.x, spawn.y, spawn.z)
    // npc.say("My Element is " + element)
    npc.timers.forceStart(1, AbilityAttemptTime * 20, true)
    npc.timers.forceStart(2, 30 * 20, true)
}
var damageBlacklist = [
    'magic',
    'lightningBolt',
    'trident',
    'thrown',
    'generic'
]
function damaged(event) {
    var npc = event.npc
    if(npc.getStoreddata().get("invulnerable") == true) event.setCanceled(true)
    var damageSource = event.damageSource 
    var roll = Math.floor(Math.random() * 100)
    // if(roll > 75 && damageSource.getType() == "player") attack["fire"]["3"](event.npc)
    for(var damage in damageBlacklist){
        if(damageSource.getType() == damageBlacklist[damage]) event.setCanceled(true)
    }

    if (damageSource.getType() == "explosion") {
        event.setCanceled(true)
        var Thread = Java.type("java.lang.Thread");
        var MyThread = Java.extend(Thread, {
            run: function () {
                Thread.sleep(10)
                npc.setMotionX(0)
                npc.setMotionY(0)
                npc.setMotionZ(0)
            }
        });
        var th = new MyThread();
        th.start();
    }
}

function meleeAttack(event){
    var npc = event.npc
}

function rangedAttack(event){

}

function target(event){
    var npc = event.npc
    // attack["water"]["1"](npc)
}

function targetLost(event){
    var npc = event.npc
}

function timer(event){
    var npc = event.npc
    var storedData = npc.getStoreddata()
    // if(storedData.get("phase") == 2) return
    var chance = 0
    switch(event.id){
        case 1: {
            if(storedData.get("attacking") == "true") {
                // npc.say("still attacking, return early")
                return
            } 
            storedData.put("attacking", "true")
            if(storedData.get("phase") == 2) chance = Math.floor(Math.random() * 100)
            if( chance < 5) {
                var randomAttackIndex = Math.floor(Math.random() * Object.keys(specialAttacks.length + 1))
                specialAttacks[randomAttackIndex](event, npc)
                return
            }
            var element = getElement(npc)
            var randomAttackIndex = Math.floor(Math.random() * Object.keys(attack["special"]).length + 1)
            // npc.say("My Element is " + element + " doing attack nr: " + randomAttackIndex)
            attack["special"][randomAttackIndex](event, npc)

            break
        }
        // Element Changer
        case 2: {
            setElement(npc)
            // npc.say('Next Element: ' + getElement(npc))

            
            break
        }
    }
}

function tick(event){
    var npc = event.npc
    var currentPhase = npc.getStoreddata().get("phase") 

    if(npc.health > npc.maxHealth*0.6 && currentPhase == 2){    
        npc.getStoreddata().put("phase", 1)
        setPhase(npc, 1)
    }
    if(npc.health < npc.maxHealth*0.5 && currentPhase == 1) {
        npc.getStoreddata().put("phase", 2)
        setPhase(npc, 2)
    }
}

function interact(event){
    var npc = event.npc
    var MCEntity = npc.getMCEntity()
    // npc.say("you right clicked me")
    attack["fire"]["2"](npc)
}






function RandomElement(){
    var randomIndex = Math.floor(Math.random() * elements.length)
    return elements[randomIndex]
}

function setElement(npc){
    for(var element in elements){
        if(npc.hasTag(elements[element])) npc.removeTag(elements[element])
    }
    var element = RandomElement()
    npc.addTag(element)
    var mainItem = npc.getMainhandItem()
    var offItem = npc.getOffhandItem()
    mainItem.setColor(Colors[element])
    offItem.setColor(Colors[element])
    var boots = npc.getArmor(0)
    var leggings = npc.getArmor(1)
    var chestplate = npc.getArmor(2)
    var helmet = npc.getArmor(3)
    boots.nbt.getCompound("display").setInteger("color", Colors[element])
    chestplate.nbt.getCompound("display").setInteger("color", Colors[element])
    helmet.nbt.getCompound("display").setInteger("color", Colors[element])
    return element
}

function getElement(npc){
    for(var element in elements){
        if(npc.hasTag(elements[element])) return elements[element]
    }
}

function setPhase(npc, phase) {
    switch(phase){
        case 1: {
            npc.say("You're no match for me!")
            break
        }
        case 2: {
            npc.say("You have really angered me!")
            break
            //Spawn Gateway here!
        }
        case 3: {
            npc.say("You have really angered me! Phase 3")
            break

        }
    }
}

