import { useMutation } from 'react-query';
import { deleteNote } from '../../Api';

interface Props {
  data: Note[];
  refetch: () => void;
}
export default function Notes({ data, refetch }: Props) {
  const { mutate } = useMutation(deleteNote, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <ul className="divide-y divide-gray-200 px-4">
      {data?.map(({ title, content, _id }: Note, key: number) => (
        <li key={key} className="py-4 w-full">
          <div className="flex items-center">
            <div className="flex w-full justify-between items-center">
              <label
                htmlFor="todo1"
                className="ml-3 text-left text-lg font-medium text-gray-900"
              >
                {title}
                <p className="text-[13px] text-gray-500">{content}</p>
              </label>
              <span
                className="text-sm cursor-pointer text-red-600 font-light"
                onClick={() => {
                  if (confirm('Are you sure?')) {
                    mutate(_id);
                  } else {
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
