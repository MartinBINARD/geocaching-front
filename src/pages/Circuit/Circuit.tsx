import { Outlet } from 'react-router-dom';

function Circuit() {
  return (
    <main className="flex flex-col gap-2 p-4 lg:w-1/2 lg:m-auto">
      <Outlet />
    </main>
  );
}

export default Circuit;
