import {PlusCircle} from "phosphor-react";
import { FormEvent, useContext } from "react";
import { TasksContext } from "../../context/TodoContext";

import styles from './styles.module.scss'

export function InputTask(){
  const {
    handleCreateTodo,
    newTodoTitle,
    setNewTodoTitle
  } = useContext(TasksContext)

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoTitle}
          placeholder='Adicione uma nova tarefa'
          onChange={(e)=>{setNewTodoTitle(e.target.value)}}
        />
        <button type="submit">
          <div className={styles.buttonContent}>
            Criar <PlusCircle size={22}/>
          </div>
        </button>
      </form>
    </div>
  )
}