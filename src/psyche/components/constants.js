// This file will contain constant values used thoughout the program

import IronBox from '../../assets/iron_box.png'

import CalendarBox from '../../assets/calendar_box.png'

import PlanetCoreBox from '../../assets/planet_core_box.png'

import SizeBox from '../../assets/size_box.png'

export const ROTATION_SPEED = 0.0002 // Rotation speed that will be for the asteroid and blink icon

// Hotspots that will be displayed on the asteroid, adding more hotspot here
export const hotspots = [
	{
		position: [0, 1, 2],
		type: 'iron',
		scale: [0.05, 0.3, 0.3],
		meshRotation: [0, 5, 0.5],
		boxImage: IronBox,
		imageUrl: '/assets/nickle_icon.png',
	},
	{
		position: [-2.4, -1, -1],
		type: 'calendar',
		scale: [0.05, 0.3, 0.3],
		meshRotation: [0, 2.3, -0.33],
		boxImage: CalendarBox,
		imageUrl: 'src/assets/calendar_icon.png',
	},
	{
		position: [2.5, -1, -1],
		type: 'planetCore',
		scale: [0.05, 0.3, 0.3],
		meshRotation: [0, 0.4, -0.2],
		boxImage: PlanetCoreBox,
		imageUrl: 'src/assets/planet_core_icon.png',
	},
	{
		position: [-0.4, 2.1, -1.3],
		type: 'size',
		scale: [0.05, 0.3, 0.3],
		meshRotation: [0, 1.7, 0.8],
		boxImage: SizeBox,
		imageUrl: 'src/assets/size_icon.png',
	},
]
