const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')

let enableLogging = false

const strata = {
    thema: {
        name: 'Thema',
        min_y: 32,
        max_y: 1024,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 3.0,
            'minecraft:generic.max_health': 6.0,
            'minecraft:generic.movement_speed': 1.025,
            'minecraft:generic.armor': 1.5,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 1.5
        }
    },
    altum: {
        name: 'Altum',
        min_y: 0,
        max_y: 31,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 4.0,
            'minecraft:generic.max_health': 8.0,
            'minecraft:generic.movement_speed': 1.05,
            'minecraft:generic.armor': 2.0,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 1.5
        }
    },
    caligo: {
        name: 'Caligo',
        min_y: -32,
        max_y: -1,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 5.0,
            'minecraft:generic.max_health': 10.0,
            'minecraft:generic.movement_speed': 1.075,
            'minecraft:generic.armor': 2.5,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 2.0
        }
    },
    copiosus: {
        name: 'Copiosus',
        min_y: -64,
        max_y: -33,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 6.0,
            'minecraft:generic.max_health': 14.0,
            'minecraft:generic.movement_speed': 1.1,
            'minecraft:generic.armor': 3.0,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 2.0
        }
    },
    noir: {
        name: 'Noir',
        min_y: -128,
        max_y: -65,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 7.0,
            'minecraft:generic.max_health': 18.0,
            'minecraft:generic.movement_speed': 1.1,
            'minecraft:generic.armor': 3.5,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 2.5
        }
    },
    tenebris: {
        name: 'Tenebris',
        min_y: -256,
        max_y: -129,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 8.0,
            'minecraft:generic.max_health': 24.0,
            'minecraft:generic.movement_speed': 1.1,
            'minecraft:generic.armor': 4.0,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 2.5
        }
    },
    abyss: {
        name: '<shake>Abyss</shake>',
        min_y: -512,
        max_y: -257,
        // entity_whitelist: [],
        entity_blacklist: [],
        attribute_modifiers: {
            'minecraft:generic.attack_damage': 10.0,
            'minecraft:generic.max_health': 32.0,
            'minecraft:generic.movement_speed': 1.25,
            'minecraft:generic.armor': 5.0,
            'forge:step_height_addition': 2,
            'minecraft:generic.follow_range': 4.0
        }
    }
}

EntityEvents.checkSpawn(event => {
    if (event.type == 'NATURAL') event.entity.persistentData.naturalSpawn = true
})

EntityEvents.spawned(event => {
    if (!event.entity.persistentData.naturalSpawn) return
    let entity = event.entity
    if (entity.type == 'minecraft:player' || entity.type == 'drg_flares:drg_flare' || entity.type == 'minecraft:item' || entity.type == 'minecraft:falling_block') return
    let y = entity.y
    if (y > strata.thema.min_y) event.cancel()
    if (!entity.isLiving() || !entity.isMonster()) return
    let stratum = Object.keys(strata).find(stratum => y >= strata[stratum].min_y && y <= strata[stratum].max_y)
    if (!stratum) return
    if (enableLogging) console.log(`Entity spawned in ${stratum}`)
    entity.persistentData.stratum = stratum
    let attributes = strata[stratum].attribute_modifiers
    Object.keys(attributes).forEach(attribute => {
        if (enableLogging) console.log(['1-------------------------------------', entity.getAttribute(attribute).getBaseValue(), attribute])
        entity.modifyAttribute(attribute, 'deep_dive:stratum', attributes[attribute], 'multiply_total')
        entity.setHealth(entity.getMaxHealth())
        if (enableLogging) console.log(['2-------------------------------------', entity.getAttribute(attribute).getBaseValue()])
    })
})

PlayerEvents.tick(event => {
    // When the player's stratum changes, change the UI text
    const { player } = event
    let y = player.y
    player.paint({ y: { type: 'text', text: 'Depth: ' + -Math.floor(y - 63).toString(), alignX: 'center', alignY: 'top', x: 0, y: 30, color: '#FFFFFF' } })
    let stratum = Object.keys(strata).find(stratum => y >= strata[stratum].min_y && y <= strata[stratum].max_y)
    if (!stratum) return
    if (player.persistentData.stratum == stratum) return
    player.persistentData.stratum = stratum
    player.paint({
        bulk: [{
            stratum_bg: { type: 'rectangle', x: 0, y: 6, w: 100, h: 15, color: '#661111111', alignX: 'center', alignY: 'top' },
            stratum_bg2: { type: 'rectangle', x: 0, y: 7, w: 98, h: 13, color: '#661111111', alignX: 'center', alignY: 'top' },
            stratum: { type: 'text', text: strata[stratum].name, alignX: 'center', alignY: 'top', x: 0, y: 10, color: '#FFFFFF' }
        }]
    })
})

PlayerEvents.loggedIn(event => {
    // Tell the player what stratum they're in when they log in
    const { player } = event
    let y = player.y
    let stratum = Object.keys(strata).find(stratum => y >= strata[stratum].min_y && y <= strata[stratum].max_y)
    if (!stratum) return
    player.persistentData.stratum = stratum
    player.paint({
        bulk: [{
            stratum_bg: { type: 'rectangle', x: 0, y: 6, w: 100, h: 15, color: '#661111111', alignX: 'center', alignY: 'top' },
            stratum_bg2: { type: 'rectangle', x: 0, y: 7, w: 98, h: 13, color: '#661111111', alignX: 'center', alignY: 'top' },
            stratum: { type: 'text', text: strata[stratum].name, alignX: 'center', alignY: 'top', x: 0, y: 10, color: '#FFFFFF' }
        }]
    })
})