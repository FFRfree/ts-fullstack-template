import { Form, FormItemProps, FormInstance } from "antd";
import { ReactNode, useCallback, useRef } from "react";
import { isEqual } from "lodash";

type ControlHandle = {
  value: any;
  onChange: (value: any) => void;
};

type FormItemPlusProps<RenderProps extends {}, Values = any> = Omit<
  FormItemProps<Values>,
  "shouldUpdate" | "children"
> & {
  /** 这里不到拿到Form的initialValue进行 renderProps的初始化，所以需要自己输入一个 */
  initialRenderProps?: RenderProps;
  getRenderProps?: (formValues: Values) => RenderProps;
  render?: (
    controlHandle: ControlHandle,
    props: RenderProps,
    form: FormInstance<Values>
  ) => ReactNode;
};

export const FormItemPlus = <RenderProps extends {}, Values = any>(
  props: FormItemPlusProps<RenderProps, Values>
) => {
  const {
    // formItemPlus props
    render,
    getRenderProps,
    initialRenderProps,
    // original form props
    ...rest
  } = props;

  const renderPropsRef = useRef(initialRenderProps as RenderProps);

  const shouldUpdate = useCallback(
    (_p: Values, v: Values) => {
      const newState = getRenderProps?.(v) ?? {};
      if (!isEqual(renderPropsRef.current, newState)) {
        renderPropsRef.current = newState as RenderProps;
        return true;
      }
      return false;
    },
    [getRenderProps, renderPropsRef]
  );

  return (
    <Form.Item<Values> shouldUpdate={shouldUpdate} noStyle>
      {(form) => {
        return (
          <Form.Item {...rest}>
            <DataEntry
              render={(controlHandle: ControlHandle) => {
                return render?.(
                  controlHandle,
                  renderPropsRef.current,
                  form as FormInstance<Values>
                );
              }}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

const DataEntry = (props: any) => {
  const { value, onChange, render } = props;

  return render({ value, onChange });
};
