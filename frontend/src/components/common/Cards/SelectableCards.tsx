import React from "react";
import { Card, Typography } from "@material-tailwind/react";

interface SelectableCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  selectedColor?: string;
  defaultColor?: string;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  label,
  selected,
  onClick,
  selectedColor = "bg-blue-500 text-white",
  defaultColor = "bg-gray-200 text-black",
}) => {
  return (
    <Card
      onClick={onClick}
      className={`shadow-sm cursor-pointer inline-flex items-center justify-center rounded-md px-4 py-2 ${
        selected ? selectedColor : defaultColor
      }`}
    >
      <Typography variant="body2" className="text-xs">
        {label}
      </Typography>
    </Card>
  );
};

export default SelectableCard;
