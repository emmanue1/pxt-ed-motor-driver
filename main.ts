/**
 * Blocks for driving the Grove Motor Driver Board
 */
//% weight=70 icon="\uf013" color=#EC7505
//% block="ED Motor Driver"
//% block.loc.fr="Pilote de moteur ED"
namespace ed_grove_i2c_motor_driver {
	
	/*************************************************************************
	 * micro:bit motor driver blocks 
	 *************************************************************************/
    export enum MotorDirection {
        //% block="forward"
		//% block.loc.fr="avant"
        Forward,
        //% block="reverse"
		//% block.loc.fr="arrière"
        Reverse
    }

    export enum Motors {
        //%blockId=ed_grove_i2c_motor_driver_motor_one
        //% block="motor 1"
		//% block.loc.fr="moteur 1"
        Motor1,
        //%blockId=ed_grove_i2c_motor_driver_motor_two
        //% block="motor 2"
		//% block.loc.fr="moteur 2"
        Motor2
    }

	// Constants
	const Nothing: number           = 0x01
	
	const MotorSpeedSet: number     = 0x82
	const PWMFrequenceSet: number   = 0x84
	const DirectionSet: number      = 0xaa
	const MotorSetA: number         = 0xa1
	const MotorSetB: number         = 0xa5
	const EnableStepper: number     = 0x1a
	const UnenableStepper: number   = 0x1b
	const Stepernu: number          = 0x1c
	
	const F_31372Hz: number         = 0x01
	const F_3921Hz: number          = 0x02	// Default value
	const F_490Hz: number           = 0x03
	const F_122Hz: number           = 0x04
	const F_30Hz: number            = 0x05
	
	const I2CMotorDriverAdd: number = 0x0f	// Set the address of the I2CMotorDriver

	// States
	let dirMotor1 = 0;
	let dirMotor2 = 0;
	let speedMotor1 = 0;
	let speedMotor2 = 0;
	
	/**
	 * Write values to the device at I2C address 'I2CMotorDriverAdd'
	 */
	function writeValues(register: number, val1: number, val2: number): void {
		let val = pins.createBufferFromArray([register, val1, val2])
		pins.i2cWriteBuffer(I2CMotorDriverAdd, val)
		basic.pause(4)
	}
	
	/**
	 * Update directions and speeds
	 */
	function update(): void {
		// Binary flags for direcions
		let flag1 = (dirMotor1 == MotorDirection.Forward) ? 0b10 : 0b01;
		let flag2 = (dirMotor2 == MotorDirection.Forward) ? 0b10 : 0b01;
		let flags = (flag2 << 2) | flag1;
		// Directions
		writeValues(DirectionSet, flags, 0x00);
        // Speeds	
        writeValues(MotorSpeedSet, Math.trunc(speedMotor1/100*255), Math.trunc(speedMotor2/100*255));
	}
	
	/**
	 * Init: Setting PWM Frequency
	 */
	writeValues(PWMFrequenceSet, F_3921Hz, 0x00)
	
	/**
	 * Starts motors
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed how fast to spin the motor
	 */
	//% blockId=ed_grove_i2c_motor_driver_motor_on
    //% block="start the %motor|on %dir|at speed %speed"
	//% block.loc.fr="démarrer le %motor|en %dir|à la vistesse %speed"
    //% speed.min=0 speed.max=100 speed.defl=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
		speed = Math.min(Math.max(speed, 0), 100);
		
		if (motor == Motors.Motor1) {
			if ((dirMotor1 != dir) || (speedMotor1 != speed)) {
				dirMotor1 = dir;
				speedMotor1 = speed;
				update();
			}
		} else {
			if ((dirMotor2 != dir) || (speedMotor2 != speed)) {
				dirMotor2 = dir;
				speedMotor2 = speed;
				update();
			}
		}
	}
	
	/**
     * Stops motors
     * @param motor :which motor to turn off
     */
    //% blockId=ed_grove_i2c_motor_driver_motor_off
    //% block="stop the %motor"
    //% block.loc.fr="arrêter le %motor"
    export function motorOff(motor: Motors): void {
        motorOn(motor, MotorDirection.Forward, 0)
    }
}
