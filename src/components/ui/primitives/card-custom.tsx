import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "./button";

interface CardCustomProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  submitButton?: boolean;
  cancelButton?: boolean;
  textSubmit?: string;
  textCancel?: string;
  onSubmit?: () => void;
  className?: string;
}

export function CardCustom(props: CardCustomProps) {
  return (
    <Card className={props.className}>
      <CardHeader>
        {props.title && <CardTitle>{props.title}</CardTitle>}
        {props.description && (
          <CardDescription>{props.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter className="justify-end">
        <CardAction>
          {props.footer ? (
            props.footer
          ) : (
            <>
              {props.cancelButton && (
                <Button onClick={props.onSubmit}>
                  {props.textCancel ? props.textCancel : "Submit"}
                </Button>
              )}
              {props.submitButton && (
                <Button onClick={props.onSubmit}>
                  {props.textSubmit ? props.textSubmit : "Submit"}
                </Button>
              )}
            </>
          )}
        </CardAction>
      </CardFooter>
    </Card>
  );
}
