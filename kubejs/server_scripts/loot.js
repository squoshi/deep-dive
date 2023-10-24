const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')

LootJS.modifiers(event => {
    /**
     * Nuke.
     */
    event.addLootTableModifier(/.*/).removeLoot(Ingredient.all)
})