interface IButton {
  className?: string;
  title: string;
  onClick?: () => void;
}

export const Button = ({ title, onClick, className }: IButton) => {
  return (
    <button
      className={`bg-[#222222] text-white rounded-xl p-2 mt-6 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
