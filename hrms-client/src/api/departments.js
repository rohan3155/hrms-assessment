import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getDepartments = async ({ skip = 0, limit = 10, search = '', sort_by = 'id', order = 'asc' }) => {
	const params = new URLSearchParams({ skip, limit, sort_by, order })
	if (search) params.append('search', search)

	const res = await fetch(`${API_BASE}/departments/?${params.toString()}`)
	if (!res.ok) throw new Error('Failed to fetch departments')
	return res.json()
}

export const createDepartment = async (data) => {
	const res = await fetch(`${API_BASE}/departments/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Failed to create department')
	return res.json()
}

export const updateDepartment = async ({ id, data }) => {
	const res = await fetch(`${API_BASE}/departments/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (!res.ok) throw new Error('Failed to update department')
	return res.json()
}

export const deleteDepartment = async (id) => {
	const res = await fetch(`${API_BASE}/departments/${id}`, {
		method: 'DELETE',
	})
	if (!res.ok) throw new Error('Failed to delete department')
	return true
}

import { toast } from 'sonner'

// Hooks
export const useDepartments = (params = {}) => {
	return useQuery({
		queryKey: ['departments', params],
		queryFn: () => getDepartments(params),
	})
}

export const useCreateDepartment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createDepartment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['departments'] })
			toast.success('Department created successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to create department')
		}
	})
}

export const useUpdateDepartment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateDepartment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['departments'] })
			toast.success('Department updated successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update department')
		}
	})
}

export const useDeleteDepartment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteDepartment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['departments'] })
			toast.success('Department deleted successfully')
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete department')
		}
	})
}
