import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";


interface ParticulesProviderProps {
  children: ReactNode;
}
export interface Task {
  id: number,
  todo: string,
  isComplete: boolean
}

interface TasksContextData{
  tasks:Task[];
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  handleCreateTodo: (event: FormEvent) => void;
  handleDeletTodo: (id: number) => void;
  handleToggleTodoCompletion: (id: number) => void;
  
} 
export const TasksContext =  createContext<TasksContextData>(
  {} as TasksContextData
  );

export function TaskProvider({children}: ParticulesProviderProps){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('')

  useEffect(()=>{
    let localStorageTasks = localStorage.getItem('tasks') as string
    const localStorageParticule = JSON.parse(localStorageTasks) !== null ? JSON.parse(localStorageTasks) : []
    setTasks(localStorageParticule)
  },[])
  


  function handleCreateTodo (event: FormEvent){

    event.preventDefault()

    const addTask = {
      id: Math.random(),
      todo: newTodoTitle,
      isComplete: false
    }
    if(newTodoTitle !== ''){
      const loadTasks = [
        ...tasks, addTask
      ]
      setTasks(loadTasks)
      localStorage.setItem('tasks', JSON.stringify(loadTasks))

    }else {
      return
    }
    
    setNewTodoTitle('')

  }
  function handleDeletTodo(id: number){
    const tasksWhitoutDeleteOne = tasks.filter( (task) =>( 
      task.id !==  id
    ))
    setTasks(tasksWhitoutDeleteOne)
    localStorage.setItem('tasks', JSON.stringify(tasksWhitoutDeleteOne))

  }
  function handleToggleTodoCompletion(id: number) {
    const  updateTask = tasks.map(task =>{
      if(task.id=== id) {
        task.isComplete = !task.isComplete;
      }
      return task
    })

    setTasks(updateTask)
    localStorage.setItem('tasks', JSON.stringify(updateTask))

  }

  return(
    <TasksContext.Provider 
      value={{
        tasks,
        newTodoTitle,
        setNewTodoTitle,
        handleCreateTodo,
        handleToggleTodoCompletion,
        handleDeletTodo
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}