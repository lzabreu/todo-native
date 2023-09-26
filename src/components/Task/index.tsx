import { View, Text, TouchableOpacity, Image } from 'react-native'

export interface TaskProps {
	taskId: string
	task: string
	done: boolean
	onRemove: () => void
	onDone: () => void
}
export function Task({ task, done, taskId, onRemove, onDone }: TaskProps) {
	return (
		<View className='flex-row items-center w-full p-3 mb-2 bg-[#262626] border border-gray-700 rounded-md'>
			{done && (
				<TouchableOpacity
					className='items-center justify-center w-4 h-4 bg-[#8284fa] rounded-full'
					onPress={onDone}
				></TouchableOpacity>
			)}
			{!done && (
				<TouchableOpacity
					className='items-center justify-center w-4 h-4 border-2 border-[#8284fa] rounded-full'
					onPress={onDone}
				></TouchableOpacity>
			)}

			{done && (
				<Text className='flex-1 mx-2 text-base text-gray-500 line-through'>
					{task}
				</Text>
			)}
			{!done && (
				<Text className='flex-1 mx-2 text-base text-white'>{task}</Text>
			)}

			<TouchableOpacity
				className=''
				onPress={onRemove}
			>
				<Image
					source={require('../../../assets/trash.png')}
					resizeMode='contain'
				/>
			</TouchableOpacity>
		</View>
	)
}
