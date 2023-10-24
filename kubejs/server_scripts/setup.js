// priority: 0
// ignore: false
// requires: create
// requires: kubejsadditions

const $CurrencyHelper = Java.loadClass('com.nyfaria.numismaticoverhaul.currency.CurrencyHelper')
const $CurrencyHolderAttacher = Java.loadClass('com.nyfaria.numismaticoverhaul.cap.CurrencyHolderAttacher')

let enableLogging = false

// Default attributes on spawn. You can always add more, it's dynamic.
const attributes = {
    'minecraft:generic.max_health': 100,
    'forge:step_height_addition': 0.5,
    'forge:entity_gravity': 0.04,
    'minecraft:generic.movement_speed': 0.115,
}

/**
 * ![](https://media.tenor.com/GOabrbLMl4AAAAAd/plink-cat-plink.gif)
 * @private You don't need to use this outside of this file.
 * @author ssquoshi
 * @param {Internal.Player} player
 * @param {boolean} pushToDefault
 * @param {boolean} setFromDefault
*/
function setAttributes(player, pushToDefault, setFromDefault) {
    if (!setFromDefault) {
        Object.keys(attributes).forEach(attribute => {
            player.getAttribute(attribute).setBaseValue(attributes[attribute])
        })
    } else {
        player.persistentData.attributes.default.forEach(attribute => {
            let [name, value] = String(attribute).split('=')
            let n = name.replace('"', '')
            let v = value.replace('"', '')
            player.getAttribute(n).setBaseValue(v)
        })
    }
    if (pushToDefault) {
        let persistentAttributes = {
            default: []
        }
        Object.keys(attributes).forEach(attribute => {
            persistentAttributes.default.push(`${attribute}=${attributes[attribute]}`)
        })
        player.persistentData.attributes = player.persistentData.attributes || persistentAttributes
        if (!player.persistentData.attributes.default || player.persistentData.attributes.default != persistentAttributes.default) {
            player.persistentData.attributes.default = persistentAttributes.default
        }
    }
}

PlayerEvents.loggedIn(event => {
    const { player } = event
    if (player.persistentData.firstjoin) return
    setAttributes(player, true, false)
    player.persistentData.firstjoin = true
})


/*
Attributes reset on player death. This is a workaround.
*/
EntityEvents.spawned(event => {
    if (event.entity.type != 'minecraft:player') return
    console.log('test')
    if (enableLogging) console.log(event.entity.persistentData) // returns {}
    Utils.server.scheduleInTicks(3, () => {
        if (enableLogging) console.log(event.entity.persistentData) // returns { attributes: { default: [ 'minecraft:generic.max_health=100', 'forge:step_height_addition=0.5', 'forge:entity_gravity=0.04', 'minecraft:generic.movement_speed=0.15' ] } }
        // See what I mean by "jank"?
        setAttributes(event.entity, false, true)
        Utils.server.runCommandSilent(`cofh heal ${event.entity.profile.name}`)
    })
})

/*
Entity gravity is weird, because it doesn't affect fall damage. Just setting a constant value for fall distance here.
*/
EntityEvents.hurt(event => {
    if (event.entity.type != 'minecraft:player' || event.source != DamageSource.FALL) return
    if (event.entity.fallDistance < 8) event.cancel()
})

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*
Allows Diving Helmets to give Water Breathing (Free Breathing) even outside of water.
*/
PlayerEvents.tick(event => {
    const { headArmorItem, chestArmorItem, legsArmorItem, feetArmorItem } = event.player;
    if (event.player.creativeMode) return
    if (((headArmorItem.id == 'create:copper_diving_helmet' && chestArmorItem.id == 'create:copper_backtank')
        || (headArmorItem.id == 'create:netherite_diving_helmet' && chestArmorItem.id == 'create:netherite_backtank'))
        && chestArmorItem.nbt.Air > 0
        && event.player.y < -2) {
        event.player.potionEffects.add('water_breathing', 2, 0, true, false)
        // Remove air from tank as normal
        if (event.player.level.time % 20 == 0
            && chestArmorItem.nbt.Air > 0) {
            chestArmorItem.nbt.Air--
        }
    }
})
/*
Convert experience into persistent data
*/
PlayerEvents.tick(event => {
    if (!event.player.persistentData.xp) event.player.persistentData.xp = 0
    if (event.player.totalExperience > 0) {
        event.player.persistentData.xp += event.player.totalExperience
        event.player.totalExperience = 0
    }
})

/*
Allow players to collect coins instantly instead of into their inventory
*/
ItemEvents.pickedUp(event => {
    if (event.item.id == 'numismaticoverhaul:gold_coin' || event.item.id == 'numismaticoverhaul:silver_coin' || event.item.id == 'numismaticoverhaul:bronze_coin') {
        console.log($CurrencyHelper.getValue([event.item]))
        event.player.inventory.extractItem(event.player.inventory.find(event.item), event.item.count, false)
        $CurrencyHolderAttacher.getExampleHolderUnwrap(event.player).modify($CurrencyHelper.getValue([event.item]))
        return false
    }
})

/*
Custom health bar
*/
PlayerEvents.tick(event => {
    let width = event.player.getHealth() / event.player.getMaxHealth() * 148
    event.player.paint({ hpxbg: { x: 25, y: -20, w: 150, h: 14, color: '#FF550000', alignX: 'left', alignY: 'bottom', type: 'rectangle' } })
    event.player.paint({ hpxbg2: { x: 26, y: -21, w: 148, h: 12, color: '#FF330000', alignX: 'left', alignY: 'bottom', type: 'rectangle' } })
    event.player.paint({ hpx: { x: 26, y: -21, w: width, h: 12, color: '#FFFF0000', alignX: 'left', alignY: 'bottom', type: 'rectangle' } })
    event.player.paint({ hpxtxt: { type: 'text', x: 27, y: -22, text: `${Math.round(event.player.getHealth())}/${Math.round(event.player.getMaxHealth())}`, color: '#FFFFFFFF', alignX: 'left', alignY: 'bottom', scale: 0.7 } })
})