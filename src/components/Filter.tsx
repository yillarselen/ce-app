import { Status } from "../models/Status.model";

interface FilterProps {
  handleFilter: (item: string) => void;
}

const Filter = ({ handleFilter }: FilterProps) => {
  const result = (Object.keys(Status) as (keyof typeof Status)[]).map((key) => {
    return Status[key];
  });

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    handleFilter(element.value);
  };

  return (
    <div className="mb-5">
      <select
        onChange={handleChange}
        id="status"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Choose a status</option>
        {result.map((item) => {
          const string = item.toLowerCase().split("_").join(" ");
          return (
            <option key={item} value={item}>
              {string.charAt(0).toUpperCase() + string.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
