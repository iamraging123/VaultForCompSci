function update_fraction (num: number, den: number) {
    oled.drawRect(
    0,
    20,
    128,
    40,
    false,
    true,
    false
    )
    oled.drawText(
    convertToText(num),
    60,
    20,
    true,
    false
    )
    oled.drawRect(
    55,
    30,
    75,
    30,
    true,
    true,
    false
    )
    oled.drawText(
    convertToText(den),
    60,
    32,
    true,
    false
    )
    oled.draw()
}
function Open () {
    servos.P2.setAngle(180)
}
function get_fraction () {
    while (editing_donenumden_11 > -1) {
        a_button_pressed = tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P1)
        input_dial = Math.floor(Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, -9, 9))
        if (a_button_pressed && !(button_down)) {
            button_down = 1
            if (editing_donenumden_11 == 0) {
                editing_donenumden_11 = 1
            } else {
                editing_donenumden_11 = 0
            }
        } else if (!(a_button_pressed)) {
            button_down = 0
        }
        if (editing_donenumden_11 == 0) {
            num = input_dial
        } else {
            den = input_dial
        }
        update_fraction(num, den)
        basic.pause(50)
        if (tinkercademy.ADKeyboard(ADKeys.D, AnalogPin.P1)) {
            editing_donenumden_11 = -1
        }
    }
}
function AnswerCheck () {
    if (num == AnswerNum1 && den == AnswerDem1) {
        serial.writeLine("Open")
        Open()
        basic.showIcon(IconNames.Yes)
    } else {
        serial.writeLine("Close")
        Close()
        basic.showIcon(IconNames.No)
    }
    if (tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P1) && tinkercademy.ADKeyboard(ADKeys.E, AnalogPin.P1)) {
        ButPres = 1
    } else {
        if (!(tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P1)) || !(tinkercademy.ADKeyboard(ADKeys.E, AnalogPin.P1))) {
            ButPres = 0
        }
    }
}
function plot_corners (x1: number, y1: number, x2: number, y2: number) {
    oled.drawText(
    convertToText(x1),
    48,
    1,
    true,
    false
    )
    oled.drawText(
    convertToText(y1),
    80,
    1,
    true,
    false
    )
    oled.drawText(
    convertToText(x2),
    48,
    9,
    true,
    false
    )
    oled.drawText(
    convertToText(y2),
    80,
    9,
    true,
    false
    )
}
function Close () {
    servos.P2.setAngle(0)
}
let ButPres = 0
let button_down = 0
let input_dial = 0
let a_button_pressed = false
let editing_donenumden_11 = 0
let AnswerDem1 = 0
let AnswerNum1 = 0
let den = 0
let num = 0
oled.init()
oled.clear(false)
let x1 = randint(-9, 9)
let x2 = randint(x1 - 9, x1 + 9)
let y1 = randint(-9, 9)
let y2 = randint(y1 - 9, y1 + 9)
num = 0
den = 0
AnswerNum1 = y1 - y2
AnswerDem1 = x1 - x2
serial.writeNumber(AnswerDem1)
serial.writeString(", ")
serial.writeNumber(AnswerNum1)
serial.writeLine("")
editing_donenumden_11 = 0
plot_corners(x1, y1, x2, y2)
oled.draw()
music.setBuiltInSpeakerEnabled(true)
servos.P0.setRange(10, 170)
Close()
basic.forever(function () {
    get_fraction()
    AnswerCheck()
})
