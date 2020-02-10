import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

app.store(
  async (state, { event, returnValues }) => {
    let nextState = {
      ...state,
    }

    try {
      switch (event) {
        case 'CreateTask':
          nextState = {
            ...nextState,
            tasks: [
              ...nextState.tasks,
              {
                id: returnValues.tId,
                name: returnValues.name,
                priority: returnValues.priority,
                complete: false,
              },
            ],
          }
          console.log(event, state, nextState)
          return nextState
        case 'ChangePriority':
          nextState = {
            ...nextState,
            tasks: [
              ...nextState.tasks.map(task =>
                task.id === returnValues.tId
                  ? {
                      ...task,
                      priority: returnValues.priority,
                    }
                  : task
              ),
            ],
          }
          console.log(event, state, nextState)
          return nextState
        case 'DeleteTask':
          nextState = {
            ...nextState,
            tasks: [
              ...nextState.tasks.filter(task => task.id !== returnValues.tId),
            ],
          }
          console.log(event, state, nextState)
          return nextState
        case 'CompleteTask':
          nextState = {
            ...nextState,
            tasks: [
              ...nextState.tasks.map(task =>
                task.id === returnValues.tId
                  ? {
                      ...task,
                      complete: true,
                    }
                  : task
              ),
            ],
          }
          console.log(event, state, nextState)
          return nextState
        default:
          return state
      }
    } catch (err) {
      console.log(err)
    }
  },
  {
    init: initializeState(),
  }
)

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState() {
  return async cachedState => {
    return {
      ...cachedState,
      tasks: [],
    }
  }
}
