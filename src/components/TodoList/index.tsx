import { InputTask } from '../InputTodo'
import {Trash } from "phosphor-react";

import styles from './styles.module.scss'
import { useContext } from 'react';
import { TasksContext } from '../../context/TodoContext';

export function TodoList(){
  const {
    tasks,
    handleToggleTodoCompletion,
    handleDeletTodo
    } = useContext(TasksContext)
  const totalTasks = tasks.length
  const countIsComplete = tasks.filter( task => task.isComplete === true).length

  return (
    <>
      <InputTask/>

      <div className={styles.container}>
        <div className={styles.infoContent}>

         <h4>Tarefas<span>{totalTasks}</span> </h4>
         <h4>Conluídas<span> {countIsComplete} de {totalTasks}</span></h4>
        </div>
        
        {
          totalTasks > 0 ? (
            <div className={styles.todoContent}>
      
              <table>
                <tbody>
                  { tasks.map(task => (
                    <tr key={task.id}>
                      <td>

                        <input
                          id={`${task.id}`}
                          readOnly
                          type="checkbox"
                          checked={task.isComplete}
                          onClick={()=>{handleToggleTodoCompletion(task.id)}}
                        />
                        
                      </td>
                      <td>
                        <p className={`${task.isComplete ? `${styles.isCompleted}`: ''}`}>
                          <label htmlFor={`${task.id}`}>{task.todo}</label>
                        </p>
                        </td>
                      <td>
                        <Trash
                          size={24}
                          onClick={()=>{handleDeletTodo(task.id)}}
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ):(
            <div className={styles.todoEmpty}>
      
              <img src="/images/clipboard.svg" alt="Clipboard" />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <h3>Crie tarefas e organize seus itens a fazer</h3>
            </div>
          )
        }
      </div>
    </>
  )
}