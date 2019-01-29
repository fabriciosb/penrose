import * as React from "react";
import {toScreen} from "../Util";
import memoize from "fast-memoize";

interface IProps {
  shapes: Array<[string, any]>;
  canvasSize: [number, number];
}

const toPointListString = memoize(
  (ptList: any[], canvasSize: [number, number]) =>
    ptList
      .map((coords: [number, number]) => {
        const pt = toScreen(coords, canvasSize);
        return pt[0].toString() + " " + pt[1].toString();
      })
      .join(" ")
);

class PolygonLayer extends React.Component<IProps> {
  public render() {
    const {shapes, canvasSize} = this.props;
    return (
      <g>
        {shapes.map(([name, shape]: [string, any], key: number) => {
          if (name === "Curve") {
            const ptListString = toPointListString(
              shape.polyline.contents,
              canvasSize
            );
            return (
              <polyline
                key={key}
                points={ptListString}
                stroke="black"
                fillOpacity="0"
              />
            );
          }
          return <g key={key}/>;
        })}
      </g>
    );
  }
}

export default PolygonLayer;
