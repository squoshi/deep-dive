const $ScreenshakeHandler = Java.loadClass('team.lodestar.lodestone.handlers.ScreenshakeHandler')
const $ScreenshakeInstance = Java.loadClass('team.lodestar.lodestone.systems.screenshake.ScreenshakeInstance')
const $Easing = Java.loadClass('team.lodestar.lodestone.systems.easing.Easing')

const $AHModKeyBindings = Java.loadClass('mod.crend.autohud.ModKeyBindings')

NetworkEvents.dataReceived('screenshake', event => {
    const { i1, i2, i3, duration } = event.data
    $ScreenshakeHandler.addScreenshake($ScreenshakeInstance(duration).setIntensity(i1, i2, i3).setEasing($Easing.SINE_IN, $Easing.QUAD_IN))
})

ClientEvents.tick(event => {
    $AHModKeyBindings.PEEK_HUD.setDown(false)
    $AHModKeyBindings.TOGGLE_HUD.setDown(false)
})

/*
Body always faces head direction
*/
ClientEvents.tick(event => {
    if (event.player.motionX == 0 && event.player.motionZ == 0) return
    event.player.yBodyRot = event.player.yaw
})

ItemEvents.tooltip(event => {
    for (let ore of global.deep_dive.ores.tier1) {
        let items = ore.items
        items.forEach((item, index) => {
            if (index == 0) return
            event.addAdvanced(item.get(), (item, advanced, text) => {
                text.add(1, `§8Quality: ${index}`)
            })
        })
    }
    for (let ore of global.deep_dive.ores.tier2) {
        let items = ore.items
        items.forEach((item, index) => {
            if (index == 0) return
            event.addAdvanced(item.get(), (item, advanced, text) => {
                text.add(1, `§8Quality: ${index}`)
            })
        })
    }
    for (let ore of global.deep_dive.ores.tier3) {
        let items = ore.items
        items.forEach((item, index) => {
            if (index == 0) return
            event.addAdvanced(item.get(), (item, advanced, text) => {
                text.add(1, `§8Quality: ${index}`)
            })
        })
    }
})

NetworkEvents.dataReceived('hit_marker', event => {
    Client.getInstance().player.playSound('cgm:item.pistol.silenced_fire', 0.5, 1.8)
})