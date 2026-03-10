import { createFileRoute } from "@tanstack/react-router";
import { Users, CalendarCheck, Building2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
    component: Index,
});

function StatCard({ title, value, icon: Icon, trend }) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {title}
                    </p>
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mt-1">
                        {value}
                    </h3>
                </div>
                <div className="p-3 bg-[var(--sand)] dark:bg-indigo-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-[var(--sea-ink-soft)] dark:text-indigo-400" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                    <span className="text-emerald-500 font-medium">
                        {trend}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-1">
                        vs last month
                    </span>
                </div>
            )}
        </div>
    );
}

function Index() {
    return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Welcome to HRMS Lite
                    </h2>
                    <p className="page-description mt-1">
                        Here's an overview of your organization today.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    title="Total Employees"
                    value="142"
                    icon={Users}
                    trend="+4.5%"
                />
                {/* <StatCard
                    title="Present Today"
                    value="118"
                    icon={CalendarCheck}
                /> */}
                <StatCard title="Departments" value="12" icon={Building2} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 pb-8">
                {/* <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-4">
                        Recent Attendance{" "}
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                        E{i}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                            Employee {i}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Checked in at 09:00 AM
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                                    Present
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-4">
                        Quick Links
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/employee"
                            className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                        >
                            <Users className="w-6 h-6 text-zinc-400 group-hover:text-indigo-500 mb-2" />
                            <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                                Manage Employees
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                                View directory
                            </p>
                        </a>
                        <a
                            href="/attendance"
                            className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                        >
                            <CalendarCheck className="w-6 h-6 text-zinc-400 group-hover:text-indigo-500 mb-2" />
                            <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                                Log Attendance
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                                Record today's shifts
                            </p>
                        </a>
                        <a
                            href="/department"
                            className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                        >
                            <Building2 className="w-6 h-6 text-zinc-400 group-hover:text-indigo-500 mb-2" />
                            <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                                Departments
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                                Org structure
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
