LootJS.modifiers(event => {
    /**
     * Nuke.
     */
    event.addLootTableModifier(/.*/).removeLoot(Ingredient.all)
})