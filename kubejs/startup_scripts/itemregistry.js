onEvent('item.registry', event => {
	// Register new items here
	event.create('ftbai:gold_coin').displayName('Gold Coin')
	event.create('ftbai:silver_coin').displayName('Silver Coin')
    event.create('ftbai:tuff_chunk').displayName('Tuff Chunk')
    event.create('ftbai:andesite_chunk').displayName('Andesite Chunk')
    event.create('ftbai:diorite_chunk').displayName('Diorite Chunk')
    event.create('ftbai:soil').displayName('Clump of Soil')
    event.create('ftbai:lexxiegrimoire').displayName(`Lexxie's Grimoire`)
    event.create('ftbai:fools_gold_ingot').displayName('Fools Gold Ingot')
    event.create('ftbai:fools_gold_nugget').displayName('Fools Gold Nugget')
    event.create('ftbai:codex_bloodmagic', "music_disc").displayName(`Bloodmagic's Codex`).song('ftbai:saereth').analogOutput(2)
    event.create('ftbai:codex_arsnouveau', "music_disc").displayName(`Ars Nouvea's Codex`).song('ftbai:r3gen').analogOutput(3)
    event.create('ftbai:codex_botania', "music_disc").displayName(`Botania's Codex`).song('ftbai:ladymayhaem').analogOutput(4)
    event.create('ftbai:codex_evilcraft', "music_disc").displayName(`Evilcraft's Codex`).song('ftbai:aaronhowser1').analogOutput(5)
    event.create('ftbai:codex_hexcasting').displayName(`Hexcasting's Codex`)
    event.create('ftbai:codex_malum', "music_disc").displayName(`Malum's Codex`).song('ftbai:loneztar').analogOutput(6)
    event.create('ftbai:codex_occultism', "music_disc").displayName(`Occultism's Codex`).song('ftbai:everlipse').analogOutput(7)
    event.create('ftbai:codex_goblin', "music_disc").displayName(`Goblin's Codex`).song('ftbai:goblins').analogOutput(8)
    event.create('ftbai:codex_final', "music_disc").displayName(`Final Codex`).song('ftbai:backstory').analogOutput(9)
    event.create('ftbai:lexxies_charm', "music_disc").displayName(`Lexxie's Charm`).song('ftbai:lady_lexxie').analogOutput(10)
    event.create('ftbai:wooden_bucket').displayName(`Wooden Bucket`)
    event.create('ftbai:source_coal').displayName(`Source Coal`).burnTime(4800)

})


