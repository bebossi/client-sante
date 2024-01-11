import { CalendarIcon, Car } from 'lucide-react';
import { STEPS } from '../../../../lib/contants';
interface ChooseProps {
  setStep: React.Dispatch<React.SetStateAction<STEPS>>;
}
export const Choose: React.FC<ChooseProps> = ({ setStep }) => {
  return (
    <div className="flex justify-around gap-1">
      <div
        data-cy="calendar"
        className="flex flex-col items-center bg-slate-200 rounded-xl p-5 hover:cursor-pointer w-1/2"
        onClick={() => setStep((value) => value + 1)}
      >
        <CalendarIcon size={50} />
        <p className="text-lg font-semibold">Busque no restaurante</p>
      </div>
      <div
        data-cy="address"
        className="flex flex-col items-center bg-slate-200 rounded-xl p-5 hover:cursor-pointer w-1/2"
        onClick={() => setStep((value) => value + 2)}
      >
        <Car size={50} />
        <p className="text-lg font-semibold">Delivery grátis ate 2km</p>
      </div>
    </div>
  );
};

export default Choose;
