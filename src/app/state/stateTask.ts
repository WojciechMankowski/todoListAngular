import { Task } from "../Type/Task"
import ErrorType from "../Type/errorType"
type startState = {
    state: "start"
}
type loadingState = {
    state: "loading"
}

type succesState = {
    state: "succes"
    response: Task[]
}

type errorState = {
    state: "error"
    error: ErrorType
}

type listState = startState | loadingState | succesState | errorState

export default  listState