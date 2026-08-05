import { getRouteApi } from '@tanstack/react-router';

export default function index() {
  const routeApi = getRouteApi('/user/');
  const data = routeApi.useLoaderData();
  return (
    <div>
      <h1>
        {data.status}
      </h1>
      <h1>
        {data.code}
      </h1>
      <h1>

      </h1>
      
      </div>
  )
}
