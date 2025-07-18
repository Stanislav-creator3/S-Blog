import { Card } from "../Card/Card";

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <Card>
      <h3 className="text-2xl bold mb-6">{title}</h3>
      {children}
    </Card>
  );
};
