/**
 * Nuke.
 */
ServerEvents.recipes(event => {
    event.remove({})
})

ServerEvents.tags('item', event => {
    event.add('deep_dive:guns', ['deep_dive:test_gun'])
})