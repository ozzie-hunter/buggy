let mapped_drive = 0
let turn = 0
let drive = 0
let enable_drive = false
radio.setGroup(1)
if (!(enable_drive)) {
    enable_drive = true
    basic.showIcon(IconNames.SmallSquare)
}
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (enable_drive) {
        if (drive < 20 && drive > -20 && (turn < 20 && turn > -20)) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
            mapped_drive = 0
            radio.sendValue("stop", mapped_drive)
            serial.writeLine("stop" + mapped_drive)
        } else if (drive < -20) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                `)
            mapped_drive = pins.map(
            drive,
            0,
            -100,
            0,
            100
            )
            radio.sendValue("forward", mapped_drive)
            serial.writeLine("forward" + mapped_drive)
        } else if (drive > 20) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # # # # #
                . # # # .
                . . # . .
                `)
            mapped_drive = pins.map(
            drive,
            0,
            100,
            0,
            100
            )
            radio.sendValue("reverse", mapped_drive)
            serial.writeLine("reverse" + mapped_drive)
        } else if (turn < -20) {
            basic.showLeds(`
                . . # . .
                . # # . .
                # # # # #
                . # # . .
                . . # . .
                `)
            mapped_drive = pins.map(
            turn,
            0,
            -100,
            0,
            100
            )
            radio.sendValue("left", mapped_drive)
            serial.writeLine("left" + mapped_drive)
        } else if (turn > 20) {
            basic.showLeds(`
                . . # . .
                . . # # .
                # # # # #
                . . # # .
                . . # . .
                `)
            mapped_drive = pins.map(
            turn,
            0,
            100,
            0,
            100
            )
            radio.sendValue("right", mapped_drive)
            serial.writeLine("right" + mapped_drive)
        }
    }
})
