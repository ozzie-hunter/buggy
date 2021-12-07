let Mapped_Drive = 0
let Turn = 0
let Drive = 0
let Enable_Drive = false
if (!(Enable_Drive)) {
    Enable_Drive = true
    basic.showIcon(IconNames.SmallSquare)
}
basic.forever(function () {
    Drive = input.rotation(Rotation.Pitch)
    Turn = input.rotation(Rotation.Roll)
    if (Enable_Drive) {
        if (Drive < -20) {
            Mapped_Drive = pins.map(
            Drive,
            0,
            -90,
            0,
            100
            )
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                `)
        } else if (Drive > 20) {
            Mapped_Drive = pins.map(
            Drive,
            0,
            100,
            0,
            -90
            )
            basic.showLeds(`
                . . # . .
                . . # . .
                # # # # #
                . # # # .
                . . # . .
                `)
        } else if (Drive < 20 && Drive > -20 && (Turn < 20 && Turn > -20)) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
        }
        if (Turn < -20) {
            Mapped_Drive = pins.map(
            Turn,
            0,
            -1023,
            0,
            1023
            )
            basic.showLeds(`
                . . # . .
                . # # . .
                # # # # #
                . # # . .
                . . # . .
                `)
        } else if (Turn > 20) {
            Mapped_Drive = pins.map(
            Turn,
            0,
            1023,
            0,
            1023
            )
            basic.showLeds(`
                . . # . .
                . . # # .
                # # # # #
                . . # # .
                . . # . .
                `)
        }
    }
})
