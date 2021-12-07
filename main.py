def on_button_pressed_a():
    global Enable_Drive
    if not (Enable_Drive):
        basic.show_icon(IconNames.HAPPY)
        Enable_Drive = True
        basic.show_icon(IconNames.SMALL_SQUARE)
    else:
        basic.show_icon(IconNames.NO)
        Enable_Drive = False
input.on_button_pressed(Button.A, on_button_pressed_a)

Mapped_Drive = 0
Turn = 0
Drive = 0
Enable_Drive = False
basic.show_icon(IconNames.SQUARE)
radio.set_group(1)
Enable_Drive = False

def on_forever():
    global Drive, Turn, Mapped_Drive
    Drive = input.rotation(Rotation.PITCH)
    Turn = input.rotation(Rotation.ROLL)
    if Enable_Drive:
        radio.send_value("Turn", Turn)
        if Drive < -20:
            Mapped_Drive = pins.map(Drive, 0, -100, 0, 100)
            radio.send_value("Forward", Mapped_Drive)
            basic.show_leds("""
                . . # . .
                                . # # # .
                                # # # # #
                                . . # . .
                                . . # . .
            """)
        elif Drive > 20:
            Mapped_Drive = pins.map(Drive, 0, 100, 0, 100)
            radio.send_value("Reverse", Mapped_Drive)
            basic.show_leds("""
                . . # . .
                                . . # . .
                                # # # # #
                                . # # # .
                                . . # . .
            """)
        else:
            radio.send_value("Stop", 0)
            basic.show_leds("""
                . . . . .
                                . # # # .
                                . # # # .
                                . # # # .
                                . . . . .
            """)
        if Turn < -20:
            Mapped_Drive = pins.map(Turn, -20, -100, 0, 100)
            radio.send_value("turn", Mapped_Drive)
            basic.show_leds("""
                . . # . .
                                . # # . .
                                # # # # #
                                . # # . .
                                . . # . .
            """)
    else:
        radio.send_value("stop", 0)
        basic.show_leds("""
            . . # . .
                        . # # # .
                        # # . # #
                        . # # # .
                        . . # . .
        """)
basic.forever(on_forever)
