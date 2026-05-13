import { reactive, readonly } from 'vue'
const state = reactive([])
let toastId = 0

export function useToast() {
    
    const add = ({ message = '', type = 'info', duration = 3000 }) => {
        const id = ++toastId
        const toast = { id, message, type, duration }

        state.push(toast)

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => remove(id), duration)
        }

        return id
    }

    const remove = (id) => {
        const index = state.findIndex((t) => t.id === id)
        if (index > -1) {
            state.splice(index, 1)
        }
    }

    const clear = () => {
        state.length = 0
    }


    const success = (message, duration = 3000) => {
        return add({ message, type: 'success', duration })
    }

    const error = (message, duration = 5000) => {
        return add({ message, type: 'error', duration })
    }

    const warning = (message, duration = 4000) => {
        return add({ message, type: 'warning', duration })
    }

    const info = (message, duration = 3000) => {
        return add({ message, type: 'info', duration })
    }

    return {
        toasts: readonly(state), 
        add,
        remove,
        clear,
        success,
        error,
        warning,
        info,
    }
}