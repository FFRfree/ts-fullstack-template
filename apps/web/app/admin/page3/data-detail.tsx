import { FormInstance } from "antd";
import FormItem from "antd/es/form/FormItem";

export const DataDetail = ({}: {}) => {
  return (
    <>
      <FormItem noStyle shouldUpdate>
        {(form) => {
          const values = form.getFieldsValue();

          return <FormItem>{JSON.stringify(values)}</FormItem>;
        }}
      </FormItem>
    </>
  );
};
