import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any

  return (
    <div className="">
      <h1>{'oops'}</h1>
      <p>{'title'}</p>
      <p className="">
        <span className="">{error?.status}</span>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <button className="button_primary">
        <Link to="/">{'go back'}</Link>
      </button>
    </div>
  )
}
