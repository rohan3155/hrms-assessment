import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import DepartmentForm from '../../components/forms/DepartmentForm'

export const Route = createLazyFileRoute('/department/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [departments, setDepartments] = useState([
		...Array.from({ length: 40 }).map((_, i) => ({
			id: i + 1,
			name: `Department ${i + 1}`,
		}))
	])

	return <div className="space-y-6">
		<div className="page-heading">
			<div>
				<p className="page-eyebrow">Organization</p>
				<h2 className="page-title">Departments</h2>
				<p className="page-description">Manage departments from one place.</p>
			</div>

			<button
				type="button"
				className="primary-btn"
				onClick={() => setIsCreateDialogOpen(true)}
			>
				Create new
			</button>
		</div>

		<DataTable
			columns={[
				{ key: "id", label: "ID", sortable: true },
				{ key: "name", label: "Name", sortable: true },
			]}
			data={departments}
			actions={[
				() => <button>Edit</button>,
				() => <button>Delete</button>
			]}
		/>

		<Dialog
			open={isCreateDialogOpen}
			title="Create department"
			description="Add a department."
			onClose={() => setIsCreateDialogOpen(false)}
		>
			<DepartmentForm
				onCancel={() => setIsCreateDialogOpen(false)}
				onSuccess={() => setIsCreateDialogOpen(false)}
				onCreate={department => {
					setDepartments(prev => [{ ...department, id: prev.length + 1 }, ...prev])
				}}
			/>
		</Dialog>
	</div>
}
