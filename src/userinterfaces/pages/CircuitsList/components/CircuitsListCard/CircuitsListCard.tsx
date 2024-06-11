import { Link } from 'react-router-dom';
import { Circuit } from '../../../../../domain/entities/circuit';

interface ListProps {
  list: Circuit[];
}

function CircuitListCard({ list }: ListProps) {
  return (
    <section className="w-full h-full overflow-y-auto text-primary md:h-[60vh]">
      {list.map((item) => (
        <Link key={item.id_circuit} to={`/circuit/${item.id_circuit}`}>
          <div className="card card-side h-24 shadow-lg rounded-lg mb-2 sm:h-32">
            <figure className="w-20 sm:w-32">
              <img
                src={item.url_image}
                alt="parcours"
                className="object-cover h-full w-full"
              />
            </figure>
            <div className="card-body w-1/2 p-4">
              <h2 className="card-title max-sm:text-sm">{item.name}</h2>
              <p className="text-ellipsis overflow-auto max-sm:text-xs">
                {item.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default CircuitListCard;
