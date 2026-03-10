import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/department/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/department/"!</div>
}
