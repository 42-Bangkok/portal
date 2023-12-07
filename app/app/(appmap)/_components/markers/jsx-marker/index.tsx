// @ts-nocheck
/**
 * Use this to render JSX inside a leaflet marker, source:
/* https://codesandbox.io/s/react-leaflet-jsx-markers-8g1uvd?file=/src/JSXMarker.tsx
/* https://stackoverflow.com/questions/47018368/implementing-a-dynamic-jsx-element-within-a-marker-using-react-leaflet/75216099#75216099
*/

import React, { useState } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

interface Props extends MarkerProps {
  /**
   * Options to pass to the react-lefalet L.divIcon that is used as the marker's custom icon
   */
  iconOptions?: L.DivIconOptions;
}

/**
 * React-leaflet marker that allows for fully interactive JSX in its icon
 */
export const JSXMarker = React.forwardRef<L.Marker, Props>(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = useState<L.Marker>();

    const node = React.useMemo(
      () => (ref ? ReactDOM.createRoot(ref.getElement()) : null),
      [ref]
    );

    return (
      <>
        {React.useMemo(
          () => (
            <Marker
              {...rest}
              ref={(r) => {
                setRef(r as L.Marker);
                if (refInParent) {
                  // @ts-expect-error fowardref ts defs are tricky
                  refInParent.current = r;
                }
              }}
              icon={L.divIcon(iconOptions)}
            />
          ),
          [] // eslint-disable-line react-hooks/exhaustive-deps
        )}
        {ref && node.render(children)}
      </>
    );
  }
);

JSXMarker.displayName = "JSXMarker";
