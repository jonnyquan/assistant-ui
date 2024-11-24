"use client";

import { forwardRef, type FC } from "react";
import { PlusIcon } from "lucide-react";

import { withDefaults } from "./utils/withDefaults";
import { ThreadListPrimitive } from "../primitives";
import ThreadListItem from "./thread-list-item";
import { useThreadConfig } from "./thread-config";
import { Button, ButtonProps } from "./base";

const ThreadList: FC = () => {
  return (
    <ThreadListRoot>
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListRoot>
  );
};

const ThreadListRoot = withDefaults("div", {
  className: "aui-root aui-thread-list-root",
});
ThreadListRoot.displayName = "ThreadListRoot";

const ThreadListNew = forwardRef<
  HTMLButtonElement,
  ThreadListPrimitive.New.Props & ButtonProps
>((props, ref) => {
  const {
    strings: { threadList: { new: { label = "New Thread" } = {} } = {} } = {},
  } = useThreadConfig();

  return (
    <ThreadListPrimitive.New asChild>
      <Button
        {...props}
        ref={ref}
        className="aui-thread-list-new"
        variant="ghost"
      >
        <PlusIcon />
        {label}
      </Button>
    </ThreadListPrimitive.New>
  );
});
ThreadListNew.displayName = "ThreadListNew";

const ThreadListItems: FC<{
  components?: Partial<ThreadListPrimitive.Items.Props["components"]>;
}> = ({ components }) => {
  return (
    <ThreadListPrimitive.Items
      components={{
        ...components,
        ThreadListItem: components?.ThreadListItem ?? ThreadListItem,
      }}
    />
  );
};

ThreadListItems.displayName = "ThreadListItems";

const exports = {
  Root: ThreadListRoot,
  New: ThreadListNew,
  Items: ThreadListItems,
};

export default Object.assign(ThreadList, exports) as typeof ThreadList &
  typeof exports;