import { PackageXIcon } from 'lucide-react';

interface NoContentProps {
  title?: string;
  icon?: React.ReactNode;
}

const NoContent = ({ title = 'No content', icon = <PackageXIcon size={40} /> }: NoContentProps) => {
  return (
    <div className="w-full min-h-full flex items-center justify-center flex-col gap-2">
      {icon}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default NoContent;
