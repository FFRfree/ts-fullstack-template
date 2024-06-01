import { FormInstance } from "antd";
import { toArray } from "./rc-utils-helper";
import get from "./get";
import { useForceRerender } from "@/hooks/use-force-rerender";
import { useEffect } from "react";

const createFieldEntity = ({}: {}) => {
  const fakeFieldEntity = {
    getNamePath() {
      return toArray("__FOR_FORM_WATCH_ONLY__");
    },
    onStoreChange(prevStore: any, namePathList: any, info: any) {
      console.log({ prevStore, namePathList, info });
    },
    isFieldTouched() {
      return false;
    },
    isFieldDirty() {
      return false;
    },
    isFieldValidating() {
      return false;
    },
    isListField() {
      return false;
    },
    isList() {
      return false;
    },
    isPreserve() {
      // important
      return false;
    },
    // validateRules
    // getMeta(){
    // const meta: Meta = {
    //   touched: this.isFieldTouched(),
    //   validating: this.prevValidating,
    //   errors: [],
    //   warnings: [],
    //   name: this.getNamePath(),
    //   validated: true,
    // };

    //   return null
    // }
    getMeta() {
      return null;
    },
    props: {},
  };

  return fakeFieldEntity;
};

export const watchFrom = (form: FormInstance) => {
  const internalHooks = form!.getInternalHooks("RC_FORM_INTERNAL_HOOKS");
  const { registerField } = internalHooks;

  const unreg = registerField(createFieldEntity({}));

  return () => {
    unreg(false, false, ["__FOR_FORM_WATCH_ONLY__"]);
  };
};

export const useWatchForm = (form: FormInstance) => {
  const rerender = useForceRerender();

  useEffect(() => {
    return watchFrom(form);
  }, []);

  return null;
};
