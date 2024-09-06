import React, { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useQuery } from 'react-query';
import { createNote, getNotes } from './Api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Loading } from './components';
import Notes from './atoms/notes';
import { useDebouncedValue } from './hooks/useDebounce';

const schema = yup.object().shape({
  title: yup.string().min(5).max(100).required(),
  content: yup.string().min(10).max(500).required(),
});

interface FormValues {
  title: string;
  content: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [search, setSearch] = useState('');
  const debouncedSearchQuery = useDebouncedValue(search, 250);

  const { isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ['notes'],
    refetchOnWindowFocus: false,
    queryFn: () => getNotes(debouncedSearchQuery),
  });

  const { mutate, isLoading: isCreatingNote } = useMutation(createNote, {
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchQuery]);

  const onSubmitNote = (values: any) => {
    mutate(values);
  };

  const renderError = (error: string) => (
    <span className="text-red-700 text-left">{error}</span>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
      <div className="">
        <div className="bg-white py-5 shadow-lg rounded-lg">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl uppercase">
              Notes
            </h1>
          </div>
          <form
            className="w-full max-w-lg mx-auto space-y-3 px-4 py-2"
            onSubmit={handleSubmit(onSubmitNote)}
          >
            <div className="flex items-center border-b-2 border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                {...register('title')}
                placeholder="Add a Note"
              />
            </div>
            <p>{renderError(errors.title?.message || '')}</p>
            <div className="flex items-center border-b-2 border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Content"
                {...register('content')}
              />
            </div>
            <p>{renderError(errors.content?.message || '')}</p>
            <Button isLoading={isCreatingNote} text="Create Note" />
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full overflow-hidden mt-6 py-2 flex items-center border-b-2 border-teal-500">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Notes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
          {isFetching && (
            <div className="flex my-4 items-center justify-center">
              <Loading />
            </div>
          )}
          {!isFetching && !!data?.length && (
            <Notes refetch={refetch} data={data} />
          )}
          {!isFetching && !data?.length && (
            <div className="text-center my-5">No Notes found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
