import Loading from './loading';

interface Props {
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  text: string;
}

export default function Button({ isLoading, onClick, disabled, text }: Props) {
  return (
    <button
      className="flex-shrink-0 gap-2 inline-block bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-5"
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && <Loading />}
      {!isLoading && <span>{text}</span>}
    </button>
  );
}
