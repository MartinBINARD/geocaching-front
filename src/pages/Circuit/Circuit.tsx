import { Outlet } from 'react-router-dom';

function Circuit() {
  return (
    <main className="flex flex-col gap-2 md:p-4 lg:w-1/2 my-auto lg:mx-auto">
      <Outlet />
    </main>
  );
}

export default Circuit;
