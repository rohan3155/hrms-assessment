import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import EmployeeForm from '../../components/forms/EmployeeForm'

export const Route = createLazyFileRoute('/employee/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [employees, setEmployees] = useState([
		...Array.from({ length: 40 }).map((_, i) => ({
			employee_id: 1000 + i + 1,
			full_name: `Employee ${i + 1}`,
			email: `employee${i + 1}@example.com`,
			department_id: (i % 5) + 1
		}))
	])

	return <div className="space-y-6">
		<div className="page-heading">
			<div>
				<p className="page-eyebrow">Organization</p>
				<h2 className="page-title">Employees</h2>
				<p className="page-description">Manage employees and their details from one place.</p>
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
				{ key: "employee_id", label: "Emp ID", sortable: true },
				{ key: "full_name", label: "Full Name", sortable: true },
				{ key: "email", label: "Email", sortable: true },
				{ key: "department_id", label: "Dept ID" }
			]}
			data={employees}
			actions={[
				() => <button>Edit</button>,
				() => <button>Delete</button>
			]}
		/>

		<Dialog
			open={isCreateDialogOpen}
			title="Create employee"
			description="Add a new employee to the organization."
			onClose={() => setIsCreateDialogOpen(false)}
		>
			<EmployeeForm
				onCancel={() => setIsCreateDialogOpen(false)}
				onSuccess={() => setIsCreateDialogOpen(false)}
				onCreate={employee => {
					setEmployees(prev => [employee, ...prev])
				}}
			/>
		</Dialog>
	</div>
}
