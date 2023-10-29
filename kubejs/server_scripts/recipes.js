/**
 * Nuke.
 */
ServerEvents.recipes(event => {
    event.remove({})
})

ServerEvents.tags('item', event => {
    event.add('deep_dive:guns', [
        'deep_dive:test_gun',
        'scorchedguns:r498_gauss_cannon',
        'scorchedguns:frontier_sidearm',
        'scorchedguns:astella',
    ])
    event.add('deep_dive:mining_tools', [
        'immersiveengineering:drill',
    ])
});