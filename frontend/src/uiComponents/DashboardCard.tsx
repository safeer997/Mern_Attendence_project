import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardCard = ({ title, description, buttonName, buttonAction }) => {
  return (
    <Card className='flex flex-col gap-4'>
      <CardContent className='flex flex-col gap-4'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <Button
        className='w-full sm:w-auto self-end mr-2 mt-2'
        onClick={buttonAction}
      >
        {buttonName}
      </Button>
    </Card>
  );
};

export default DashboardCard;
