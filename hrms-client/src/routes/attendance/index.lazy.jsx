import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import AttendanceForm from '../../components/forms/AttendanceForm'

export const Route = createLazyFileRoute('/attendance/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [attendances, setAttendances] = useState([
		...Array.from({ length: 40 }).map((_, i) => ({
			employee_id: 1000 + i + 1,
			date: `2024-03-${String((i % 30) + 1).padStart(2, '0')}`,
			check_in: "09:00",
			check_out: "17:00",
			status: "Present"
		}))
	])

	return <div className="space-y-6">
		<div className="page-heading">
			<div>
				<p className="page-eyebrow">Organization</p>
				<h2 className="page-title">Attendance</h2>
				<p className="page-description">Manage employee attendance and shifts from one place.</p>
			</div>

			<button
				type="button"
				className="primary-btn"
				onClick={() => setIsCreateDialogOpen(true)}
			>
				Log attendance
			</button>
		</div>

		<DataTable
			columns={[
				{ key: "employee_id", label: "Emp ID", sortable: true },
				{ key: "date", label: "Date", sortable: true },
				{ key: "check_in", label: "Check In" },
				{ key: "check_out", label: "Check Out" },
				{ key: "status", label: "Status" }
			]}
			data={attendances}
			actions={[
				() => <button>Edit</button>,
				() => <button>Delete</button>
			]}
		/>

		<Dialog
			open={isCreateDialogOpen}
			title="Log attendance"
			description="Add an attendance record for an employee."
			onClose={() => setIsCreateDialogOpen(false)}
		>
			<AttendanceForm
				onCancel={() => setIsCreateDialogOpen(false)}
				onSuccess={() => setIsCreateDialogOpen(false)}
				onCreate={attendance => {
					setAttendances(prev => [attendance, ...prev])
				}}
			/>
		</Dialog>
	</div>
}
