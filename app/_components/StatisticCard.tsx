import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatisticCardProps = {
  title: string;
  icon: JSX.Element;
  text: string;
  subtext?: string;
};

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  icon,
  text,
  subtext,
}: StatisticCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{text}</div>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
