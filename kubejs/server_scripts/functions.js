const $FTBTeams = java('dev.ftb.mods.ftbteams.FTBTeamsAPI')


function checkShop(event, shop, range, stage, questId) {
	const { player, server } = event
	const isStageExists = player.stages.has(stage);
    let nearShop = teamNear(event, shop, range)

	if (isStageExists && !nearShop) {
		const kuPlayer = new Ku.Player(player);
		player.stages.remove(stage)
		server.runCommandSilent(`ftbquests change_progress ${player.name.text} reset ${questId}`)
		if (stage != 'foodshop' && stage != 'mme') kuPlayer.showActionBar(`Leaving Shop`, Color.YELLOW, false)
	}
}

function checkTeacher(event, teacherPos, range, stage, questId) {
	const { player, server } = event
	if (player.stages.has(stage)) {
		let { x, y, z } = player
		let [teacherX, teacherY, teacherZ] = teacherPos
		if (
			x <= teacherX - range ||
			x >= teacherX + range ||
			z <= teacherZ - range ||
			z >= teacherZ + range ||
			y <= teacherY - range ||
			y >= teacherY + range
		) {
			const kuPlayer = new Ku.Player(player);
			kuPlayer.showActionBar(`Leaving ${stage} Class`, Color.YELLOW, false)
			player.stages.remove(stage)
		}
	}
}


function getPlayerElement(player) {
	let element = "none"
	Object.values(FTB_AI_CONSTS.stages).forEach(entry => {
		//console.log(`ENTRY: ${entry}`)
		if (player.stages.has(entry)) {
			element = entry.split("_")[1]
			return element
		}
	})
	return element;
}
function getRandomElement() {
	let elements = ['fire', 'earth', 'water', 'air']
	let randomInt = Math.floor(Math.random() * elements.length)
	return elements[randomInt]
}
function gamemodeSwitcher(event) {
	const { player, level, server } = event
	if (player.creativeMode || player.spectator) return
	player.stages.remove('ftbchunks_mapping')
	switch (level.dimension) {
		case 'ftbdungeons:dungeon_dim': {
			server.runCommandSilent(`gamemode survival ${player.name.text}`)
			player.tell('You have entered a Dungeon.')
			player.tell('To leave early type:\n')
			Utils.server.runCommand(`tellraw ${player.name.text} ["",{"text":"[ ","color":"gold"},{"text":"/ftbdungeons bail","color":"green","clickEvent":{"action":"run_command","value":"/ftbdungeons bail"},"hoverEvent":{"action":"show_text","contents":["Click here to leave early"]}},{"text":" ]","color":"gold"}]`)
			break
		}
		case 'minecraft:the_end':{
			if(!player.stages.has('codex_final')){
				server.runCommandSilent(`execute as ${player.name.text} run spawn`)
				player.tell("It seems the powers of the Witch are too powerful for you to handle.")
				player.tell("I should try and learn more first")
				return
			}
			server.runCommandSilent(`gamemode survival ${player.name.text}`)
			Utils.server.scheduleInTicks(10, event =>{
				player.stages.add('ftbchunks_mapping')

			})
			break
		}
		case 'ftbai:dorms': {
			let element = false
			Object.entries(FTB_AI_CONSTS.stages).forEach(([key, value]) => { 
				if(player.stages.has(value)) element = true

			})
			if(!element) Utils.server.runCommandSilent(`execute as ${player.name.text} run tp -21 -52 224`)

			server.runCommandSilent(`gamemode survival ${player.name.text}`)
			Utils.server.scheduleInTicks(10, event =>{
				player.stages.add('ftbchunks_mapping')

			})



			break
		}
		case 'minecraft:overworld': {
			server.runCommandSilent(`gamemode adventure ${player.name.text}`)
			Utils.server.scheduleInTicks(10, event =>{
				player.stages.add('ftbchunks_mapping')

			})
			break
		}
	}
}
function giveElementArmor(player, element) {
	let CosArmor = CosArmorAPI.getCAStacks(player.id)
	CosArmor.setItem(3, `arsarsenal:${element}_hat`)
	CosArmor.setItem(2, `arsarsenal:${element}_robes`)
	CosArmor.setItem(1, `arsarsenal:${element}_leggings`)
	CosArmor.setItem(0, `arsarsenal:${element}_boots`)
}
function giveTree(player) {
	let element = "stage_" + getPlayerElement(player)
	console.log(element == FTB_AI_CONSTS.stages.air)
	switch (element) {
		case FTB_AI_CONSTS.stages.fire: player.give('4x ars_nouveau:red_archwood_sapling'); break
		case FTB_AI_CONSTS.stages.water: player.give('4x ars_nouveau:blue_archwood_sapling'); break
		case FTB_AI_CONSTS.stages.earth: player.give('4x ars_nouveau:green_archwood_sapling'); break
		case FTB_AI_CONSTS.stages.air: player.give('4x ars_nouveau:purple_archwood_sapling'); break
		case 'none':
		default: {
			player.tell('')
			player.tell('You have not chosen an Element, go to your Dorm first')
			Utils.server.scheduleInTicks(1, (_) => Utils.server.runCommandSilent(`ftbquests change_progress ${player.name.text} reset ${FTB_AI_CONSTS.rewardId.arsTree}`)
			)
		}
	}
}
function giveTome(player) {
	let element = getPlayerElement(player)
	switch (element) {
		case FTB_AI_CONSTS.stages.fire:
		case FTB_AI_CONSTS.stages.water:
		case FTB_AI_CONSTS.stages.earth:
		case FTB_AI_CONSTS.stages.air: player.give(`ars_elemental:${element.split("_")[1]}_caster_tome`); break
		case 'none':
		default: {
			player.tell('')
			player.tell('You have not chosen an Element, go to your Dorm first')
			Utils.server.scheduleInTicks(1, (_) => Utils.server.runCommandSilent(`ftbquests change_progress ${player.name.text} reset ${FTB_AI_CONSTS.rewardId.elementTome}`))
		}
	}
}



function title(username, text, color, bold, italic) {
	Utils.server.runCommandSilent(
		`title ${username} title ${JSON.stringify({
			text: text,
			bold: bold ?? false,
			italic: italic ?? false,
			color: color ?? "yellow",
		})}`
	)
}
function subtitle(username, text, color, bold, italic) {
	Utils.server.runCommandSilent(
		`title ${username} subtitle ${JSON.stringify({
			text: text,
			bold: bold ?? false,
			italic: italic ?? false,
			color: color ?? "yellow",
		})}`
	)
}
function actionbar(username, text, color, bold, italic) {
	Utils.server.runCommandSilent(
		`title ${username} actionbar ${JSON.stringify({
			text: text,
			bold: bold ?? false,
			italic: italic ?? false,
			color: color ?? "yellow",
		})}`
	)
}
function teleport(entity, { x, y, z }, dimension) {
	dimension = dimension ?? 'minecraft:overworld'
	if (!entity) return
	
	Utils.server.runCommandSilent(`execute in ${dimension} as ${entity.name.text} run tp ${x} ${y} ${z}`)
	entity.sendData('closegui', { close: 1 })
}
function error_report(player, reason) {
	player.tell(`===============`)
	player.tell(reason)
	player.tell(Component.join(' ', [
		Component.white('Please Report to'),
		Component.lightPurple("[Github]")
			.click({ "action": "open_url", "value": FTB_AI_CONSTS.github })
			.hover(Text.of("Submit bug report").yellow())
	]))
	player.tell(`===============`)
}
// const stagesToCheck = [
// 	'ftbai:stage/air',
// 	'ftbai:stage/water',
// 	'ftbai:stage/fire',
// 	'ftbai:stage/earth',

// ]
// function fixStages(player) {

// 	if (!player.stages.has('fixed')) {
// 		player.stages.add('fixed')
// 		let CosArmor = CosArmorAPI.getCAStacks(player.id)
// 		let element = CosArmor.getItem(0).toString().split('_boots')[0].split('1 ')[1]
// 		if (element == 'air') return
// 		player.stages.add(FTB_AI_CONSTS.stages[element])
// 		player.tell(`Fixed ur Elemental Stage, now: ${FTB_AI_CONSTS.stages[element]}`)

// 		stagesToCheck.forEach(stage => {
// 			if (player.stages.has(stage)) {
// 				player.stages.remove(stage)
// 			}
// 		}
// 		)
// 	}
// }



const runCommands = () => {
	if (commands.length > 0) {
		commands.forEach(command => player.runCommandSilent(command));
	}
}
function reloadScripts() {
	Utils.server.runCommandSilent(`kubejs reload server_scripts`)
	Utils.server.runCommandSilent('tellraw @p "Refreshed KubeJS Server Scripts"')
}
let inspect = (obj) => {
	if (typeof obj !== 'undefined') {
		let resultArray = []
		resultArray.push(`Inspecting: ${obj}`)
		let propertiesArray = []
		let functionsArray = []
		Object.keys(obj).forEach(key => {
			let keyType = typeof obj[key]
			if (keyType === 'string' || keyType === 'number' || keyType === 'object') {
				propertiesArray.push(`  ${key}: ${obj[key]}`)
			} else if (keyType === 'function' && !key.startsWith('func_')) {
				functionsArray.push(`  ${key}: unknown`)
			} else if (keyType === 'undefined') {
				propertiesArray.push(`  ${key}: undefined`)
			}
		})
		propertiesArray.sort()
		propertiesArray.unshift('=== Properties ===')
		functionsArray.sort()
		functionsArray.unshift('=== Functions ===')
		resultArray.push(propertiesArray.join('\n'))
		resultArray.push(functionsArray.join('\n'))
		console.info(resultArray.join('\n'))
	} else console.info('inspected object is undefined')
}
function getNearbyEntities(level, position) {

	let aabb = AABB.of(position[0], position[1], position[2], position[0] + 2, position[1] + 2, position[2] + 2)
	let entities = level.getEntitiesWithin(aabb)
	return entities

}
/**
 * Calculates the front vectors of an entity based on its direction, pitch, and distance.
 * @param {Object} entity - The entity to calculate the front vectors for.
 * @param {number} dr - The direction of the entity.
 * @param {number} dp - The pitch of the entity.
 * @param {number} distance - The distance of the front vectors from the entity.
 * @param {number} mode - The mode of the entity.
 * @returns {Array} - An array containing the calculated front vectors.
 */
const FrontVectors = (entity, dr, dp, distance, mode) => {
	const angle = mode === 1 ? dr + entity.yaw : dr;
	const pitch = (mode === 1 ? -entity.pitch + dp : dp) * JavaMath.PI / 180;

	const dx = -Math.sin(angle * JavaMath.PI / 180) * (distance * Math.cos(pitch));
	const dy = Math.sin(pitch) * distance;
	const dz = Math.cos(angle * JavaMath.PI / 180) * (distance * Math.cos(pitch));

	return [dx, dy, dz];
};
function vectors(theta, r, pos) {
	let dx = r * Math.cos(theta) + pos.x;
	let dz = r * Math.sin(theta) + pos.z;
	return [dx, dz];
}

function Dvectors(horizontalAngle, verticalAngle, radius, pos) {
	let x = radius * Math.sin(verticalAngle) * Math.cos(horizontalAngle) + pos.x;
	let y = radius * Math.cos(verticalAngle);
	let z = radius * Math.sin(verticalAngle) * Math.sin(horizontalAngle) + pos.z;
	return [x, y, z];
}

function GetPlayerRotation(npc, player) {
	let dx = npc.x - player.x;
	let dz = player.z - npc.z;
	let angle = 0
	if (dz >= 0) {
		angle = Math.atan(dx / dz) * 180 / JavaMath.PI;
		angle = angle < 0 ? 360 + angle : angle;
	} else {
		angle = 180 - (Math.atan(dx / dz) * 180 / JavaMath.PI);
	}
	return angle;
}
function TrueDistanceCoord(x1, y1, z1, x2, y2, z2) {
	let dx = x1 - x2
	let dy = y1 - y2
	let dz = z1 - z2
	let R = Math.pow((dx * dx + dy * dy + dz * dz), 0.5)
	return R;
}
function pushBack(npc, player, Intensity, Height) {
	let d = FrontVectors(npc, GetPlayerRotation(npc, player), 0, Intensity, 0)
	player.addMotion(d[0], Height, d[2])
	player.minecraftEntity.hurtMarked = true

}
const range = (num1, num2) => {
	const range = [num1, num2];
	const num = Math.round(Math.random() * (range[1] - range[0])) + range[0];
	return num;
}


/**
 * Represents a particle with various attributes and methods for casting and attacking.
 * @constructor
 * @param {string} type - The type of particle.
 */
function Particle(type) {
	// Particle Attributes
	this.type = type ?? "minecraft:dust"
	this.color = 0xffffff
	this.endcolor = 0xffffff
	this.size = 1
	this.material = "minecraft:dirt"
	this.amount = 1
	this.hSpread = 0
	this.vSpread = 0
	this.speed = 0
	this.xOffset = 0
	this.zOffset = 0
	this.yOffset = 0

	// Casting Attributes
	this.delay = 0
	this.x = 0
	this.y = 0
	this.z = 0
	this.delay = 0
	this.debug = false

	// Attacking Attributes
	this.attack = false  //attack default false, set to true, to hurt other entities
	this.attackDamage = 1
	this.attackRange = 2

	this.cast = function (caster) {
		this.x = caster.x + this.xOffset
		this.y = caster.y + this.yOffset
		this.z = caster.z + this.zOffset
		let dimension = caster.level.dimension
		switch (this.type) {
			case 'minecraft:dust': {
				this.type = this.type + " " + hexToNormalizedColor(this.color) + " " + this.size
				break
			}
			case 'minecraft:dust_color_transition': {
				this.type = this.type + " " + hexToNormalizedColor(this.color) + " " + this.size + " " + hexToNormalizedColor(this.endcolor)
				break
			}
			case 'minecraft:block':
			case 'minecraft:block_marker':
			case 'minecraft:falling_dust':
			case 'minecraft:item': {
				this.type = this.type + " " + this.material
				break
			}
		}

		let command = `execute in ${dimension} run particle ${this.type} ${this.x} ${this.y} ${this.z} ${this.hSpread} ${this.vSpread} ${this.hSpread} ${this.speed} ${this.amount} force`
		if (this.debug) console.log(command)
		Utils.server.runCommandSilent(command)

		if (this.attack) {
			let entities = this.getNearbyEntities(caster.level)
			entities.forEach(entity => {
				if (entity.id != caster.id) {
					//console.log(entity)
					entity.attack(this.attackDamage)
				}
			})
		}

	}
	this.getNearbyEntities = function (level) {
		let aabb = AABB.of(this.x, this.y, this.z, this.x + this.attackRange, this.y + this.attackRange, this.z + this.attackRange)
		let entities = level.getEntitiesWithin(aabb)
		// console.log(entities)
		return entities
	}
}

/**
 * Checks if a player is within a certain distance from a position.
 * @param {Player} player - The player to check.
 * @param {Object} pos - The position to check against.
 * @param {number} distance - The maximum distance allowed.
 * @returns {boolean} - Whether the player is within the specified distance from the position.
 */
const isNear = (player, pos, distance) => {
	let x = Math.abs(Math.floor(player.x) - pos.x)
	let z = Math.abs(Math.floor(player.z) - pos.z)
	return x <= distance && z <= distance
}
const teamNear = (event, shop, range) => {
    const { player, item } = event

    let team = $FTBTeams.getManager()
    let playerTeam = team.getPlayerTeam(player.id)
    let onlineMembers = playerTeam.onlineMembers
    let near = false
    onlineMembers.forEach(member => { 
		
        if(isNear(member, shop, range)) near = true
    })
    return near
}

function one_time_message(player, stage, message){
    if(!player.stages.has(stage)){
        player.tell(message)
        player.stages.add(stage)
    }
}