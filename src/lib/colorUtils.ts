import type { Color, ColorWeight, ElementState } from "@/Types";

export const getTextColorClass = (
  color: Color | undefined,
  elementState: ElementState = "default"
): string => {
  switch (color) {
    case "red":
      if (elementState === "hover") return "hover:text-red-600";
      return "text-red-500";
    case "blue":
      if (elementState === "hover") return "hover:text-blue-600";
      return "text-blue-500";
    case "green":
      if (elementState === "hover") return "hover:text-green-600";
      return "text-green-500";
    case "yellow":
      if (elementState === "hover") return "hover:text-yellow-600";
      return "text-yellow-500";
    case "purple":
      if (elementState === "hover") return "hover:text-purple-600";
      return "text-purple-500";
    case "pink":
      if (elementState === "hover") return "hover:text-pink-600";
      return `text-pink-500`;
    case "orange":
      if (elementState === "hover") return "hover:text-orange-600";
      return "text-orange-500";
    case "gray":
      if (elementState === "hover") return "hover:text-gray-600";
      return "text-gray-500";
    default:
      return "text-gray-500"; // Default case for undefined or unrecognized color
  }
};

export const getBgColorClass = (
  color: Color | undefined,
  weight: ColorWeight = "100",
  elementState: ElementState = "default"
) => {
  switch (color) {
    case "red":
      if (elementState === "hover")
        return `hover:bg-red-${weight} hover:dark:bg-red-800`;
      return `bg-red-${weight} dark:bg-red-800`;
    case "blue":
      if (elementState === "hover")
        return `hover:bg-blue-${weight} hover:dark:bg-blue-800`;
      return `bg-blue-${weight} dark:bg-blue-800`;
    case "green":
      if (elementState === "hover")
        return `hover:bg-green-${weight} hover:dark:bg-green-800`;
      return `bg-green-${weight} dark:bg-green-800`;
    case "yellow":
      if (elementState === "hover")
        return `hover:bg-yellow-${weight} hover:dark:bg-yellow-800`;
      return `bg-yellow-${weight} dark:bg-yellow-800`;
    case "purple":
      if (elementState === "hover")
        return `hover:bg-purple-${weight} hover:dark:bg-purple-800`;
      return `bg-purple-${weight} dark:bg-purple-800`;
    case "pink":
      if (elementState === "hover")
        return `hover:bg-pink-${weight} hover:dark:bg-pink-800`;
      return `bg-pink-${weight} dark:bg-pink-800`;
    case "orange":
      if (elementState === "hover")
        return `hover:bg-orange-${weight} hover:dark:bg-orange-800`;
      return `bg-orange-${weight} dark:bg-orange-800`;
    case "gray":
      if (elementState === "hover")
        return `hover:bg-gray-${weight} hover:dark:bg-gray-800`;
      return `bg-gray-${weight} dark:bg-gray-800`;
    default:
      return undefined; // Default case for undefined or unrecognized color';
  }
};

export const getBorderColorClass = (
  color: Color,
  weight: ColorWeight,
  elementState: ElementState = "default"
) => {
  switch (color) {
    case "red":
      if (elementState === "hover") return `hover:border-red-${weight}`;
      return `border-red-${weight}`;
    case "blue":
      if (elementState === "hover") return `hover:border-blue-${weight}`;
      return `border-blue-${weight}`;
    case "green":
      if (elementState === "hover") return `hover:border-green-${weight}`;
      return `border-green-${weight}`;
    case "yellow":
      if (elementState === "hover") return `hover:border-yellow-${weight}`;
      return `border-yellow-${weight}`;
    case "purple":
      if (elementState === "hover") return `hover:border-purple-${weight}`;
      return `border-purple-${weight}`;
    case "pink":
      if (elementState === "hover") return `hover:border-pink-${weight}`;
      return `border-pink-${weight}`;
    case "orange":
      if (elementState === "hover") return `hover:border-orange-${weight}`;
      return `border-orange-${weight}`;
    case "gray":
      if (elementState === "hover") return `hover:border-gray-${weight}`;
      return `border-gray-${weight}`;
    default:
      return color;
  }
};
