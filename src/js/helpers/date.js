import { format } from 'date-fns'

export function formatDate(dateStr, type) {
    const dateConvert = new Date(dateStr);
    return format(dateConvert, type)
}
