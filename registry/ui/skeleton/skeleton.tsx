import type { UseSkeletonProps } from "./use-skeleton";

import { useSkeleton } from "./use-skeleton";

import { forwardRef } from "@/lib/system";

export interface SkeletonProps extends UseSkeletonProps {}

const Skeleton = forwardRef<"div", SkeletonProps>((props, ref) => {
  const { Component, children, getSkeletonProps, getContentProps } = useSkeleton({ ...props });

  return (
    <Component ref={ref} {...getSkeletonProps()}>
      <div {...getContentProps()}>{children}</div>
    </Component>
  );
});

Skeleton.displayName = "HeroUI.Skeleton";

export default Skeleton;
