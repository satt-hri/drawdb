import { useContext } from "react";
import { TransformRefContext } from "../context/TransformContext";

/**
 * The latest transform as a ref, for code that only needs it when an action
 * runs (e.g. placing a new element at the center of the view). Unlike
 * useTransform, it doesn't re-render the component on every pan or zoom.
 */
export default function useTransformRef() {
  return useContext(TransformRefContext);
}
