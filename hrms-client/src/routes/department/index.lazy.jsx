import { createLazyFileRoute } from '@tanstack/react-router'
import DataTable from '../../components/DataTable'

export const Route = createLazyFileRoute('/department/')({
        component: RouteComponent,
})

function RouteComponent() {
        const users = [
                ...Array.from({ length: 40 }).map((_, i) => ({
                        name: `User ${i + 1}`,
                        email: `user${i + 1}@example.com`,
                        role: "Admin"
                }))
        ]
        return <div>

                <DataTable
                        columns={[
                                { key: "name", label: "Name", sortable: true },
                                { key: "email", label: "Email", sortable: true },
                                { key: "role", label: "Role" }
                        ]}
                        data={users}
                        actions={[
                                ({ row }) => <button>Edit</button>,
                                ({ row }) => <button>Delete</button>
                        ]}
                />
        </div>
}
