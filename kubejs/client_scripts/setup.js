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

ClientEvents.tick(event => {
    event.player.yHeadRot = event.level.time % 5.625 * 64
    // event.player.setMotion(0, 0.1, 0)
})