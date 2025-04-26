import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DashboardCard = ({ title, description, buttonName, buttonAction }) => {
  return (
    <Card className="flex flex-col p-4">
      <CardContent className="flex flex-col flex-1 gap-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex-1">{description}</CardDescription>

        <div className="flex justify-end">
          <Button
            className="w-full sm:w-auto"
            onClick={buttonAction}
          >
            {buttonName}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
