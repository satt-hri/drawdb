import { useContext } from "react";
import { SetTransformContext } from "../context/TransformContext";

/**
 * setTransform without subscribing to the transform itself, so the component
 * isn't re-rendered on every pan or zoom.
 */
export default function useSetTransform() {
  return useContext(SetTransformContext);
}
