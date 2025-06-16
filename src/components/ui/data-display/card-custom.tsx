import { Button } from "../primitives/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";

interface CardCustomProps {
  readonly title?: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly submitButton?: boolean;
  readonly cancelButton?: boolean;
  readonly textSubmit?: string;
  readonly textCancel?: string;
  readonly onSubmit?: () => void;
  readonly className?: string;
  readonly disabledSubmit?: boolean;
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
                <Button
                  onClick={props.onSubmit}
                  disabled={props.disabledSubmit}
                >
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
