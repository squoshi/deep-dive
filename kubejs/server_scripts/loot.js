const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')

LootJS.modifiers(event => {
    event.addLootTableModifier(/.*/).removeLoot(Ingredient.all)

    let ores = {
        'minecraft:coal_ore': 'minecraft:coal',
        'minecraft:iron_ore': 'minecraft:raw_iron',
        'minecraft:gold_ore': 'minecraft:raw_gold',
        'minecraft:lapis_ore': 'minecraft:lapis_lazuli',
        'minecraft:redstone_ore': 'minecraft:redstone',
        'minecraft:diamond_ore': 'minecraft:diamond',
        'minecraft:emerald_ore': 'minecraft:emerald',
        'minecraft:copper_ore': 'minecraft:raw_copper',
    }
    Object.keys(ores).forEach(ore => {
        event.addBlockLootModifier(ore).addLoot(ores[ore])
    })

    // let themaModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         themaModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'thema'
    //     }).addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 8 * themaModifier).withChance(30), Item.of('numismaticoverhaul:silver_coin', 3 * themaModifier).withChance(20), Item.of('numismaticoverhaul:gold_coin', 1 * themaModifier).withChance(5)])
    // let altumModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         altumModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'altum'
    //     }).addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 10 * altumModifier).withChance(30), Item.of('numismaticoverhaul:silver_coin', 6 * altumModifier).withChance(25), Item.of('numismaticoverhaul:gold_coin', 1 * altumModifier).withChance(8)])
    // let caligoModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         caligoModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'caligo'
    //     })
    //     .addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 10 * caligoModifier).withChance(38), Item.of('numismaticoverhaul:silver_coin', 6 * caligoModifier).withChance(40), Item.of('numismaticoverhaul:gold_coin', 1 * caligoModifier).withChance(8)])
    // let copiosusModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         copiosusModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'copiosus'
    //     })
    //     .addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 10 * copiosusModifier).withChance(50), Item.of('numismaticoverhaul:silver_coin', 6 * copiosusModifier).withChance(40), Item.of('numismaticoverhaul:gold_coin', 2 * copiosusModifier).withChance(12)])
    // let noirModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         noirModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'noir'
    //     })
    //     .addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 16 * noirModifier).withChance(50), Item.of('numismaticoverhaul:silver_coin', 10 * noirModifier).withChance(55), Item.of('numismaticoverhaul:gold_coin', 3 * noirModifier).withChance(12)])
    // let tenebrisModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         tenebrisModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'tenebris'
    //     })
    //     .addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 20 * tenebrisModifier).withChance(55), Item.of('numismaticoverhaul:silver_coin', 15 * tenebrisModifier).withChance(60), Item.of('numismaticoverhaul:gold_coin', 3 * tenebrisModifier).withChance(12)])
    // let abyssModifier = 1
    // event.addLootTypeModifier(LootType.ENTITY)
    //     .entityPredicate(entity => {
    //         abyssModifier = entity.getMaxHealth() / 30
    //         return entity.isLiving() && entity.isMonster() && entity.persistentData.stratum == 'abyss'
    //     })
    //     .addWeightedLoot([1, 2], [Item.of('numismaticoverhaul:bronze_coin', 20 * abyssModifier).withChance(60), Item.of('numismaticoverhaul:silver_coin', 25 * abyssModifier).withChance(65), Item.of('numismaticoverhaul:gold_coin', 4 * abyssModifier).withChance(16)])
})

const possibleCoinDrops = {
    thema: [
        '8 numismaticoverhaul:bronze_coin 30',
        '3 numismaticoverhaul:silver_coin 20',
    ],
    altum: [
        '10 numismaticoverhaul:bronze_coin 30',
        '6 numismaticoverhaul:silver_coin 25',
    ],
    caligo: [
        '10 numismaticoverhaul:bronze_coin 38',
        '6 numismaticoverhaul:silver_coin 40',
    ],
    copiosus: [
        '10 numismaticoverhaul:bronze_coin 50',
        '6 numismaticoverhaul:silver_coin 40',
        '2 numismaticoverhaul:gold_coin 2',
    ],
    noir: [
        '16 numismaticoverhaul:bronze_coin 50',
        '10 numismaticoverhaul:silver_coin 55',
        '3 numismaticoverhaul:gold_coin 2',
    ],
    tenebris: [
        '20 numismaticoverhaul:bronze_coin 55',
        '15 numismaticoverhaul:silver_coin 60',
        '3 numismaticoverhaul:gold_coin 3',
    ],
    abyss: [
        '20 numismaticoverhaul:bronze_coin 60',
        '25 numismaticoverhaul:silver_coin 65',
        '4 numismaticoverhaul:gold_coin 5',
    ],
}

EntityEvents.death(event => {
    const { entity, source, level } = event
    if (!entity.persistentData.stratum || !entity.isLiving() || !entity.isMonster()) return
    const actual = source.actual
    if (!actual) return
    if (actual.type != 'minecraft:player') return
    let player = actual
    console.log('Entity died')
    Object.keys(possibleCoinDrops).forEach(stratum => {
        if (entity.persistentData.stratum == stratum) {
            let drops = possibleCoinDrops[stratum]
            let totalChance = 0
            drops.forEach(drop => {
                let [amount, item, chance] = drop.split(' ')
                item = item.replace(' ', '')
                amount = parseInt(amount)
                chance = parseInt(chance)
                amount *= Math.floor(entity.getMaxHealth() / 800)
                amount -= Math.random() * amount / 10
                totalChance += chance
            })
            let random = Math.random() * totalChance
            let currentChance = 0
            drops.forEach(drop => {
                let [amount, item, chance] = drop.split(' ')
                item = item.replace(' ', '')
                amount = parseInt(amount)
                chance = parseInt(chance)
                amount *= Math.floor(entity.getMaxHealth() / 30)
                amount -= Math.random() * amount / 10
                currentChance += chance
                if (item == 'numismaticoverhaul:gold_coin') chance /= 10; amount /= 10; amount = Math.floor(amount) 
                if (amount >= 2) amount -= 2
                if (random < currentChance) {
                    let itemStack = Item.of(item, amount)
                    console.log(`Dropping ${itemStack}`)
                    let i = level.createEntity('item')
                    i.item = itemStack
                    i.setPos(entity.x, entity.y, entity.z)
                    let random = Math.random() * 2
                    if (random < 1) random = Math.random() * -0.2
                    else random = Math.random() * 0.2
                    i.setMotion(random, random, random)
                    i.spawn()
                    return
                }
            })
        }
    })
    //https://github.com/MrCrayfish/MrCrayfishGunMod/blob/1.19.X/src/main/java/com/mrcrayfish/guns/item/GunItem.java#L57
    function getModifiedGun(item) {
        return item.getItem().getModifiedGun(item)
    }
    let modifiedGun = getModifiedGun(player.getMainHandItem())
    let ammo = $ForgeRegistries.ITEMS.getValue(modifiedGun.getProjectile().getItem())
    if (ammo != null) {
        let i = level.createEntity('item')
        if (player.persistentData.stratum == 'thema') i.item = Item.of(ammo.id, Utils.random.nextInt(5, 15))
        if (player.persistentData.stratum == 'altum') i.item = Item.of(ammo.id, Utils.random.nextInt(10, 20))
        if (player.persistentData.stratum == 'caligo') i.item = Item.of(ammo.id, Utils.random.nextInt(15, 25))
        if (player.persistentData.stratum == 'copiosus') i.item = Item.of(ammo.id, Utils.random.nextInt(20, 30))
        if (player.persistentData.stratum == 'noir') i.item = Item.of(ammo.id, Utils.random.nextInt(25, 35))
        if (player.persistentData.stratum == 'tenebris') i.item = Item.of(ammo.id, Utils.random.nextInt(30, 40))
        if (player.persistentData.stratum == 'abyss') i.item = Item.of(ammo.id, Utils.random.nextInt(35, 45))
        i.setPos(entity.x, entity.y, entity.z)
        let random = Math.random() * 2
        if (random < 1) random = Math.random() * -0.2
        else random = Math.random() * 0.2
        i.setMotion(random, random, random)
        i.spawn()
    }
})