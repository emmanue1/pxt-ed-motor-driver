// go round
input.onButtonPressed(Button.A, () => {
    ed_grove_i2c_motor_driver.motorOn(ed_grove_i2c_motor_driver.Motors.Motor1, ed_grove_i2c_motor_driver.MotorDirection.Forward, 100);
    ed_grove_i2c_motor_driver.motorOn(ed_grove_i2c_motor_driver.Motors.Motor2, ed_grove_i2c_motor_driver.MotorDirection.Reverse, 100);
})
// go forward
input.onButtonPressed(Button.B, () => {
    ed_grove_i2c_motor_driver.motorOn(ed_grove_i2c_motor_driver.Motors.Motor1, ed_grove_i2c_motor_driver.MotorDirection.Reverse, 100);
    ed_grove_i2c_motor_driver.motorOn(ed_grove_i2c_motor_driver.Motors.Motor2, ed_grove_i2c_motor_driver.MotorDirection.Forward, 100);
})
// stop
input.onButtonPressed(Button.AB, () => {
    ed_grove_i2c_motor_driver.motorOff(ed_grove_i2c_motor_driver.Motors.Motor1);
    ed_grove_i2c_motor_driver.motorOff(ed_grove_i2c_motor_driver.Motors.Motor2);
})
