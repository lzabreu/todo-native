import {
	Alert,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
} from 'react-native'
import { Task, TaskProps } from '../../components/Task'
import { useState } from 'react'
import uuid from 'react-native-uuid'

interface Task {
	taskId: string
	task: string
	done: boolean
}

export function Home() {
	const [taskList, setTaskList] = useState<Task[]>([])
	const [taskName, setTaskName] = useState('')
	function HandleTaskAdd(task: string) {
		if (taskList.find((task) => task.task === taskName)) {
			return Alert.alert(
				'task existe',
				'Já existe um task na lista com esse nome'
			)
		}
		const taskListItem = {
			taskId: String(uuid.v4()),
			task,
			done: false,
		}
		setTaskList((prevState) => [...prevState, taskListItem])
		setTaskName('')
	}
	function HandleTaskRemove(item: Task) {
		Alert.alert('Remover', `Remover task ${item.task} ?`, [
			{
				text: 'Sim',
				onPress: () =>
					setTaskList((prevState) =>
						prevState.filter((task) => task.taskId !== item.taskId)
					),
			},
			{
				text: 'Não',
				style: 'cancel',
			},
		])
	}
	function HandleTaskDone(item: Task) {
		const newList = taskList
		newList.map((task) => {
			if (task.taskId === item.taskId) {
				task.done = !task.done
			}
		})
		setTaskList([...newList])
	}
	return (
		<View className=' flex-1 px-6 bg-[#131016]'>
			<View className='flex items-center justify-center mt-24 mb-10 '>
				<Image
					source={require('../../../assets/Logo.png')}
					resizeMode='contain'
				/>
			</View>

			<View className='flex-row w-full mb-8'>
				<TextInput
					className='text-base bg-[#262626] h-14 rounded text-white p-4 flex-1 mr-2'
					placeholder='Adicione uma nova tarefa'
					placeholderTextColor={'#6b6b6b'}
					keyboardType='default'
					value={taskName}
					onChangeText={(text) => setTaskName(text)}
				/>
				<TouchableOpacity
					className='items-center justify-center bg-[#1e6f9f] rounded w-14 h-14'
					onPress={() => HandleTaskAdd(taskName)}
				>
					<View className='flex items-center justify-center w-5 h-5 border border-white rounded-full'>
						<Text className='text-white '>+</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View className='flex flex-row items-center justify-between mb-9'>
				<View className='flex-row items-center gap-3'>
					<Text className='text-sm text-[#4ea8de] text-bold'>Criadas</Text>
					<View className='flex px-3 py-1 bg-gray-700 rounded-full '>
						<Text className='text-xs text-white bg-gray-700 text-bold'>
							{taskList.length}
						</Text>
					</View>
				</View>
				<View className='flex-row items-center gap-3'>
					<Text className='text-sm text-[#4ea8de] text-bold'>Concluídas</Text>
					<View className='flex px-3 py-1 bg-gray-700 rounded-full '>
						<Text className='text-xs text-white bg-gray-700 text-bold'>
							{taskList.filter((task) => task.done).length}
						</Text>
					</View>
				</View>
			</View>
			<FlatList
				data={taskList}
				renderItem={({ item }) => (
					<Task
						key={item.taskId}
						taskId={item.taskId}
						task={item.task}
						done={item.done}
						onRemove={() => HandleTaskRemove(item)}
						onDone={() => HandleTaskDone(item)}
					/>
				)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Text className='px-4 text-center text-gray-400'>
						Nenhum task foi cadastrado, adicione à lista e presença
					</Text>
				)}
			/>
		</View>
	)
}
