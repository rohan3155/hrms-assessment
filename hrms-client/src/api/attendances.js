import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_BASE = 'http://localhost:8000'

// Fetchers
export const getAttendances = async ({ skip = 0, limit = 100, search = '' }) => {
	const params = new URLSearchParams({ skip, limit })
	if (search) params.append('search', search)

	const res = await fetch(`${API_BASE}/attendances/?${params.toString()}`)
	if (!res.ok) throw new Error('Failed to fetch attendances')
	return res.json()
}

export const createAttendance = async (data) => {
	const res = await fetch(`${API_BASE}/attendances/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const errorData = await res.json()
		throw new Error(errorData.detail || 'Failed to create attendance')
	}
	return res.json()
}

export const updateAttendance = async ({ id, data }) => {
	const res = await fetch(`${API_BASE}/attendances/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) {
		const errorData = await res.json()
		throw new Error(errorData.detail || 'Failed to update attendance')
	}
	return res.json()
}

export const deleteAttendance = async (id) => {
	const res = await fetch(`${API_BASE}/attendances/${id}`, {
		method: 'DELETE',
	})
	if (!res.ok) throw new Error('Failed to delete attendance')
	return true
}

// Hooks
export const useAttendances = (params = {}) => {
	return useQuery({
		queryKey: ['attendances', params],
		queryFn: () => getAttendances(params),
	})
}

export const useCreateAttendance = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createAttendance,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attendances'] })
		},
	})
}

export const useUpdateAttendance = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateAttendance,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attendances'] })
		},
	})
}

export const useDeleteAttendance = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteAttendance,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attendances'] })
		},
	})
}
