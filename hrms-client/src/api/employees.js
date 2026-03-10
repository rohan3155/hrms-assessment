import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_BASE = 'http://localhost:8000'

export const getEmployees = async ({ skip = 0, limit = 10, search = '', sort_by = 'id', order = 'asc' }) => {
	const params = new URLSearchParams({ skip, limit, sort_by, order })
	if (search) params.append('search', search)

	const res = await fetch(`${API_BASE}/employees/?${params.toString()}`)
	if (!res.ok) throw new Error('Failed to fetch employees')
	return res.json()
}

export const createEmployee = async (data) => {
	const res = await fetch(`${API_BASE}/employees/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Failed to create employee')
	return res.json()
}

export const updateEmployee = async ({ id, data }) => {
	const res = await fetch(`${API_BASE}/employees/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Failed to update employee')
	return res.json()
}

export const deleteEmployee = async (id) => {
	const res = await fetch(`${API_BASE}/employees/${id}`, {
		method: 'DELETE',
	})
	if (!res.ok) throw new Error('Failed to delete employee')
	return true
}

import { toast } from 'sonner'

// Hooks
export const useEmployees = (params = {}) => {
	return useQuery({
		queryKey: ['employees', params],
		queryFn: () => getEmployees(params),
	})
}

export const useCreateEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] })
			toast.success('Employee created successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to create employee')
		}
	})
}

export const useUpdateEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] })
			toast.success('Employee updated successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update employee')
		}
	})
}

export const useDeleteEmployee = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] })
			toast.success('Employee deleted successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete employee')
		}
	})
}
