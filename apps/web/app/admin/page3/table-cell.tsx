import { Tag } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ReactNode } from "react";

export const TableCell = (props: { row: number; col: number }) => {
  return (
    <FormItem name={["table", props.row, props.col]}>
      <DataEntry
        render={(props) => {
          // if no value, set default value to true
          // const value = props.value ?? true

          return (
            <Tag
              color={props.value ? "green" : "red"}
              onClick={() => props.onChange?.(!props.value)}
            >
              {props.value ? "开" : "关"}
            </Tag>
          );
        }}
      />
    </FormItem>
  );
};

type ControlledProps<T> = Partial<{
  value: T;
  onChange: (newValue: T) => void;
}>;

export const DataEntry = <T = any,>(
  props: ControlledProps<T> & {
    render?: (props: ControlledProps<T>) => ReactNode;
  }
) => {
  const { render } = props;
  return (
    <ErrorBoundary errorComponent={(props) => "error"}>
      {render?.(props)}
    </ErrorBoundary>
  );
};
