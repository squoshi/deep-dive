const $GunItem = Java.loadClass('com.mrcrayfish.guns.item.GunItem')
const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const TAB_KUBEJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS').tab

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

    // Tier 1 Materials
    event.create('solanite').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/solanite').tagBlock('forge:ores/solanite').tagItem('forge:ores').tagBlock('forge:ores').displayName('Solanite') // Rarity 1 (3% rad); basic fuel
    event.create('cryonite').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/cryonite').tagBlock('forge:ores/cryonite').tagItem('forge:ores').tagBlock('forge:ores').displayName('Cryonite') // Rarity 1 (none); good for high-caliber ammunition
    event.create('quasium').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/quasium').tagBlock('forge:ores/quasium').tagItem('forge:ores').tagBlock('forge:ores').displayName('Quasium') // Rarity 2 (none); blast-resistant, good for protection
    event.create('eronium').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/eronium').tagBlock('forge:ores/eronium').tagItem('forge:ores').tagBlock('forge:ores').displayName('Eronium') // Rarity 3 (5% rad); good for small ammunition
    // Tier 2 Materials
    event.create('serendine').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/serendine').tagBlock('forge:ores/serendine').tagItem('forge:ores').tagBlock('forge:ores').displayName('Serendine') // Rarity 4 (none); high blast resistance and melting point, good for firearms
    event.create('meteorite').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/meteorite').tagBlock('forge:ores/meteorite').tagItem('forge:ores').tagBlock('forge:ores').displayName('Meteorite') // Rarity 5 (8% rad); good for most ammunition
    event.create('adamantite').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/adamantite').tagBlock('forge:ores/adamantite').tagItem('forge:ores').tagBlock('forge:ores').displayName('Adamantite') // Rarity 5 (5% rad); strong, good for protection
    // Tier 3 Materials
    event.create('proto_zaplorium').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/proto_zaplorium').tagBlock('forge:ores/proto_zaplorium').tagItem('forge:ores').tagBlock('forge:ores').displayName('Proto-Zaplorium') // Rarity 6; good as nuclear fuel but not as good as the real thing
    event.create('endurium').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/endurium').tagBlock('forge:ores/endurium').tagItem('forge:ores').tagBlock('forge:ores').displayName('Endurium') // Rarity 7 (3% rad; 2% unstable); good for firearms as it is heat-resistant and blast-resistant
    // Unstable / High Rad
    event.create('radiite').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/radiite').tagBlock('forge:ores/radiite').tagItem('forge:ores').tagBlock('forge:ores').displayName('Radiite') // Rarity 9 (70% rad; 10% unstable)
    event.create('zaplorium').hardness(2.0).resistance(6).soundType('chain').tagItem('forge:ores/zaplorium').tagBlock('forge:ores/zaplorium').tagItem('forge:ores').tagBlock('forge:ores').displayName('Zaplorium') // Rarity 10 (99% unstable); better as nuclear fuel than its prototype
})

StartupEvents.registry('item', event => {
    function registerGun(id, properties) {
        event.createCustom(id, () => new $GunItem(properties(new $ItemProperties())))
    }
    registerGun('test_gun', p => p.stacksTo(1).tab(TAB_KUBEJS))
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

