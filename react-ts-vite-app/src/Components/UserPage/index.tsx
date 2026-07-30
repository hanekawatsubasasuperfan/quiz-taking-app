import { getRouteApi } from '@tanstack/react-router';

export default function index() {
  const routeApi = getRouteApi('/user/');
  const data = routeApi.useLoaderData();
  console.log(data)
  return (
    <div>
      <h1>
        {data?.email ? data?.email : "no email yet"}
      </h1>
      <h1>
        {data?.id}
      </h1>
      <h1>
        {data?.username}
      </h1>
      
      </div>
  )
}
