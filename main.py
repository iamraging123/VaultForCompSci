def plot_corners(x1: number, y1: number, x2: number, y2: number):
    oled.draw_text(convert_to_text(x1), 32, 1, True, True)
oled.init()
oled.clear(False)
x12 = randint(-9, 9)
x22 = randint(x12 - 9, x12 + 9)
y12 = randint(-9, 9)
y22 = randint(y12 - 9, y12 + 9)
serial.write_numbers([x12, y12, x22, y22])
oled.draw_rect(0, 0, 128, 64, True, True, True)
plot_corners(x12, y12, x22, y22)

def on_forever():
    serial.write_number(pins.analog_read_pin(AnalogPin.P0))
    serial.write_line("")
    basic.pause(100)
basic.forever(on_forever)
