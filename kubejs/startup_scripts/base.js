const $GunItem = Java.loadClass('com.mrcrayfish.guns.item.GunItem')
const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const TAB_KUBEJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS').tab

/**
 * 
 * @param {String} material 
 * @param {Number} hardness 
 * @param {Number} resistance 
 * @param {String} name 
 * @author ssquoshi
 */
function createMaterial(material, hardness, resistance, name) {
    if (name.includes(':')) {
        let [namespace, id] = material.split(':')
        StartupEvents.registry('block', event => {
            event.create(material).hardness(hardness).resistance(resistance).soundType('chain').tagItem(`forge:ores/${id}`).tagBlock(`forge:ores/${id}`).tagItem('forge:ores').tagBlock('forge:ores').displayName(name)
        })
        StartupEvents.registry('item', event => {
            event.create(material).displayName(name).tag(`forge:ores/${id}`).tag('forge:ores')
            for (let i = 0; i < 5; i++) {
                event.create(`${namespace}:refined_${id}_quality_${i + 1}`).displayName(`Refined ${name} (Quality ${i + 1})`).tag(`deep_dive:refined_ores/quality_${i + 1}/${id}`).tag('deep_dive:refined_ores/quality_${i + 1}')
            }
        })
    } else {
        StartupEvents.registry('block', event => {
            event.create(`deep_dive:${material}`).hardness(hardness).resistance(resistance).soundType('chain').tagItem(`forge:ores/${material}`).tagBlock(`forge:ores/${material}`).tagItem('forge:ores').tagBlock('forge:ores').displayName(name)
        })
        StartupEvents.registry('item', event => {
            event.create(material).displayName(name).tag(`forge:ores/${material}`).tag('forge:ores')
            for (let i = 0; i < 5; i++) {
                event.create(`deep_dive:refined_${material}_quality_${i + 1}`).displayName(`Refined ${name} (Quality ${i + 1})`).tag(`deep_dive:refined_ores/quality_${i + 1}/${material}`).tag('deep_dive:refined_ores/quality_${i + 1}')
            }
        })
    }
}

/**
 * Tier: 1
 * Rarity: 1
 * Radiation: 3%
 * Stability: Stable
 * Fuel: Yes
 */
createMaterial('deep_dive:solanite', 2.0, 6, 'Solanite')
/**
 * Tier: 1
 * Rarity: 1
 * Stability: Stable
 * Ammo: High-caliber
 */
createMaterial('deep_dive:cryonite', 2.0, 6, 'Cryonite')
/**
 * Tier: 1
 * Rarity: 2
 * Stability: Stable
 * Protection: Blast-resistant
 * Weapon Material: Yes
 */
createMaterial('deep_dive:quasium', 2.0, 6, 'Quasium')
/**
 * Tier:1
 * Rarity: 3
 * Radiation: 5%
 * Stability: Stable
 * Ammo: Low-caliber
 */
createMaterial('deep_dive:eronium', 2.0, 6, 'Eronium')

/**
 * Tier: 2
 * Rarity: 4
 * Stability: Stable
 * Weapon Material: Yes
 */
createMaterial('deep_dive:serendine', 2.0, 6, 'Serendine')
/**
 * Tier: 2
 * Rarity: 5
 * Radiation: 8%
 * Stability: Stable
 * Ammo: Any
 * Protection: Good
 */
createMaterial('deep_dive:meteorite', 2.0, 6, 'Meteorite')
/**
 * Tier: 2
 * Rarity: 5
 * Radiation: 5%
 * Stability: Stable
 * Protection: Good
 * Weapon Material: Yes
 */
createMaterial('deep_dive:adamantite', 2.0, 6, 'Adamantite')
/**
 * Tier: 2
 * Rarity: 9
 * Radiation: 70%
 * Stability: Unstable
 * Fuel: Yes
 */
createMaterial('deep_dive:radiite', 2.0, 6, 'Radiite')
/**
 * Tier: 3
 * Rarity: 6
 * Fuel: Yes
 * Radiation: 75%
 */
createMaterial('deep_dive:proto_zaplorium', 2.0, 6, 'Proto-Zaplorium')
/**
 * Tier: 3
 * Rarity: 7
 * Radiation: 3%
 * Stability: Stable
 * Protection: Good
 * Weapon Material: Yes
 */
createMaterial('deep_dive:endurium', 2.0, 6, 'Endurium')
/**
 * Tier: 3
 * Rarity: 10
 * Radiation: 99%
 * Stability: Unstable
 * Fuel: Yes
 */
createMaterial('deep_dive:zaplorium', 2.0, 6, 'Zaplorium')

StartupEvents.registry('block', event => {
    // Re-create vanilla blocks for biome color support
    event.create('minecraft:stone').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:granite').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:diorite').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:andesite').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:calcite').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:tuff').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:dripstone_block').hardness(1.5).resistance(6).soundType('stone').color(0, 'grass')
    event.create('minecraft:gravel', 'falling').hardness(1.0).resistance(3).soundType('gravel').color(0, 'grass')
})

StartupEvents.registry('item', event => {
    /**
     * 
     * @param {String} id 
     * @param {Internal.Supplier} properties
     * @author ssquoshi
     */
    function registerGun(id, properties) {
        event.createCustom(id, () => new $GunItem(properties(new $ItemProperties())))
    }
    registerGun('deep_dive:test_gun', p => p.stacksTo(1).tab(TAB_KUBEJS))
})

ItemEvents.modification(event => {
    event.modify('numismaticoverhaul:gold_coin', item => {
        item.maxStackSize = 64
    })
    event.modify('numismaticoverhaul:silver_coin', item => {
        item.maxStackSize = 64
    })
    event.modify('numismaticoverhaul:bronze_coin', item => {
        item.maxStackSize = 64
    })
})

