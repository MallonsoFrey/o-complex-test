interface IReview {
  id: number;
  text: string;
}

export const ReviewCard = ({ id, text }: IReview) => {
  return (
    <div className="bg-[#D9D9D9] w-full sm:w-[468px] max-w-[400px] min-h-[300px] flex flex-col items-center justify-start gap-6 p-4 rounded-xl shadow-md">
      <div className="font-semibold text-lg">Отзыв: {id}</div>
      <div className="text-center" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};
