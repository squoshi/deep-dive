//priority: 100

const $GunItem = Java.loadClass('com.mrcrayfish.guns.item.GunItem')
const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const TAB_KUBEJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS').tab
const BiomeFilter = Java.loadClass('dev.latvian.mods.kubejs.level.gen.filter.biome.BiomeFilter')

global.minecraft = {}

/**
 * 
 * @param {String} material 
 * @param {Number} hardness 
 * @param {Number} resistance 
 * @param {String} name 
 * @author ssquoshi
 */
function createMaterial(material, hardness, resistance, name) {
    let sound = new SoundType(1.0, 1.0, 'minecraft:block.chain.break', 'minecraft:block.netherite_block.step', 'minecraft:block.netherite_block.place', 'minecraft:block.netherite_block.hit', 'minecraft:block.netherite_block.fall')
    let registeredBlocks = []
    if (material.indexOf(':') != -1) {
        let [namespace, id] = material.split(':')
        StartupEvents.registry('block', event => {
            registeredBlocks.push(event.create(material).hardness(hardness).resistance(resistance).soundType(sound).tagItem(`forge:ores/${id}`).tagBlock(`forge:ores/${id}`).tagItem('forge:ores').tagBlock('forge:ores').displayName(name).noItem())
        })
        StartupEvents.registry('item', event => {
            event.create(material).displayName(name).tag(`forge:ores/${id}`).tag('forge:ores')
            for (let i = 0; i < 5; i++) {
                event.create(`${namespace}:refined_${id}_quality_${i + 1}`).displayName(`Refined ${name} (Quality ${i + 1})`).tag(`deep_dive:refined_ores/quality_${i + 1}/${id}`).tag(`deep_dive:refined_ores/quality_${i + 1}`).texture(`deep_dive:item/refined_materials/${id}`)
            }
        })
    } else {
        StartupEvents.registry('block', event => {
            registeredBlocks.push(event.create(`deep_dive:${material}`).hardness(hardness).resistance(resistance).soundType(sound).tagItem(`forge:ores/${material}`).tagBlock(`forge:ores/${material}`).tagItem('forge:ores').tagBlock('forge:ores').displayName(name).noItem())
        })
        StartupEvents.registry('item', event => {
            event.create(`deep_dive:${material}`).displayName(name).tag(`forge:ores/${material}`).tag('forge:ores')
            for (let i = 0; i < 5; i++) {
                let item = event.create(`deep_dive:refined_${material}_quality_${i + 1}`).displayName(`Refined ${name} (Quality ${i + 1})`).tag(`deep_dive:refined_ores/quality_${i + 1}/${material}`).tag(`deep_dive:refined_ores/quality_${i + 1}`).texture(`deep_dive:item/refined_materials/${material}`)
                if (i == 2) item.rarity()
            }
        })
    }
    return registeredBlocks
}

/**
 * Tier: 1
 * Rarity: 1
 * Radiation: 3%
 * Stability: Stable
 * Fuel: Yes
 */
let SOLANITE = createMaterial('deep_dive:solanite', 2.0, 6, 'Solanite')
/**
 * Tier: 1
 * Rarity: 1
 * Stability: Stable
 * Ammo: High-caliber
 */
let CRYONITE = createMaterial('deep_dive:cryonite', 2.0, 6, 'Cryonite')
/**
 * Tier: 1
 * Rarity: 2
 * Stability: Stable
 * Protection: Blast-resistant
 * Weapon Material: Yes
 */
let QUASIUM = createMaterial('deep_dive:quasium', 2.0, 6, 'Quasium')
/**
 * Tier:1
 * Rarity: 3
 * Radiation: 5%
 * Stability: Stable
 * Ammo: Low-caliber
 */
let ERONIUM = createMaterial('deep_dive:eronium', 2.0, 6, 'Eronium')

/**
 * Tier: 2
 * Rarity: 4
 * Stability: Stable
 * Weapon Material: Yes
 */
let SERENDINE = createMaterial('deep_dive:serendine', 2.0, 6, 'Serendine')
/**
 * Tier: 2
 * Rarity: 5
 * Radiation: 8%
 * Stability: Stable
 * Ammo: Any
 * Protection: Good
 */
let METEORITE = createMaterial('deep_dive:meteorite', 2.0, 6, 'Meteorite')
/**
 * Tier: 2
 * Rarity: 5
 * Radiation: 5%
 * Stability: Stable
 * Protection: Good
 * Weapon Material: Yes
 */
let ADAMANTITE = createMaterial('deep_dive:adamantite', 2.0, 6, 'Adamantite')
/**
 * Tier: 2
 * Rarity: 9
 * Radiation: 70%
 * Stability: Unstable
 * Fuel: Yes
 */
let RADIITE = createMaterial('deep_dive:radiite', 2.0, 6, 'Radiite')
/**
 * Tier: 3
 * Rarity: 6
 * Fuel: Yes
 * Radiation: 75%
 */
let PROTOZAPLORIUM = createMaterial('deep_dive:proto_zaplorium', 2.0, 6, 'Proto-Zaplorium')
/**
 * Tier: 3
 * Rarity: 7
 * Radiation: 3%
 * Stability: Stable
 * Protection: Good
 * Weapon Material: Yes
 */
let ENDURIUM = createMaterial('deep_dive:endurium', 2.0, 6, 'Endurium')
/**
 * Tier: 3
 * Rarity: 10
 * Radiation: 99%
 * Stability: Unstable
 * Fuel: Yes
 */
let ZAPLORIUM = createMaterial('deep_dive:zaplorium', 2.0, 6, 'Zaplorium')

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

global.minecraft.worldgen_defaults = {
    configured_feature: Utils.getRegistry('worldgen/configured_feature').getIds(),
    ores: [
        "minecraft:coal_ore",
        "minecraft:iron_ore",
        "minecraft:gold_ore",
        "minecraft:lapis_ore",
        "minecraft:redstone_ore",
        "minecraft:diamond_ore",
        "minecraft:emerald_ore",
        "minecraft:copper_ore",
        "minecraft:deepslate_copper_ore",
        "minecraft:deepslate_emerald_ore",
        "minecraft:deepslate_diamond_ore",
        "minecraft:deepslate_gold_ore",
        "minecraft:deepslate_iron_ore",
        "minecraft:deepslate_lapis_ore",
        "minecraft:deepslate_redstone_ore",
        "minecraft:deepslate_coal_ore",
    ],
    'GenerationStep': [
        "raw_generation",
        "lakes",
        "local_modifications",
        "underground_structures",
        "surface_structures",
        "strongholds",
        "underground_ores",
        "underground_decoration",
        "fluid_springs",
        "vegetal_decoration",
        "top_layer_modification",
    ],
    'GenerationStep$Decoration': [
        'FLUID_SPRINGS',
        'LAKES',
        'LOCAL_MODIFICATIONS',
        'RAW_GENERATION',
        'STRONGHOLDS',
        'SURFACE_STRUCTURES',
        'TOP_LAYER_MODIFICATION',
        'UNDERGROUND_DECORATION',
        'UNDERGROUND_ORES',
        'UNDERGROUND_STRUCTURES',
        'VEGETAL_DECORATION',
    ]
}
WorldgenEvents.remove(event => {
    event.removeOres(props => {
        props.worldgenLayer = 'underground_ores'
        props.blocks = global.minecraft.worldgen_defaults.ores
    })
    // let featureRemoveBlacklist = [
    //     'create:striated_ores_overworld',
    // ]
    global.minecraft.worldgen_defaults['GenerationStep$Decoration'].forEach(step => {
        // if (featureRemoveBlacklist.some(f => f == dec)) return
        if (step == 'UNDERGROUND_ORES') return
        event.removeAllFeatures(BiomeFilter.ALWAYS_TRUE, step)
    })
})