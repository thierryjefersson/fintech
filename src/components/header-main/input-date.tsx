import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';

type InputDateProps = {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  label: string;
};

export default function InputDate({ value, setValue, label }: InputDateProps) {
  return (
    <div>
      <span className="text-sm mb-1 block pl-5">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              '2xl:min-w-[230px] w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="size-4 mr-2" />
            {value ? (
              format(value, 'PPP', { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            components={{
              DayContent: (props) => {
                return (
                  <PopoverClose
                    asChild
                    className="size-full flex items-center justify-center"
                  >
                    <span>{props.date.getDate()}</span>
                  </PopoverClose>
                );
              },
            }}
            mode="single"
            selected={value}
            onSelect={(date) => date && setValue(date)}
            locale={ptBR}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
