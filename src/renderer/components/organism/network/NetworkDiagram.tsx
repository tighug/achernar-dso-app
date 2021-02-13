import React from "react";
import { Stage } from "react-konva";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { AppPanel } from "../../molecule/AppPanel";
import { NetworkAxes } from "./NetworkAxes";
import { NetworkNodesAndLines } from "./NetworkNodesAndLines";

type NetworkDiagramProps = {
  children?: never;
  width: number;
  height: number;
};

export function NetworkDiagram({ width, height }: NetworkDiagramProps) {
  const offset = 70;
  const length = width - offset - 5;
  const theme = useTheme();
  const { nodes } = useSelector((s) => s.nodes);
  const { lines } = useSelector((s) => s.lines);
  const { flows } = useSelector((s) => s.flows);
  const { loads, pvs } = useSelector((s) => s.loads);
  const diagrams = useSelector((s) => s.diagrams);

  const posXs = nodes.map((n) => n.posX);
  const posYs = nodes.map((n) => n.posY);
  const [minX, maxX] = [Math.min(...posXs), Math.max(...posXs)];
  const [minY, maxY] = [Math.min(...posYs), Math.max(...posYs)];
  const maxW = maxX - minX;
  const maxH = maxY - minY;
  const scale = maxW >= maxH ? length / maxW : length / maxH;

  const modNodes = nodes.map(({ id, num, posX, posY }) => ({
    id,
    num,
    x: offset + (posX - minX) * scale,
    y: length - (posY - minY) * scale,
  }));

  return (
    <AppPanel>
      <StyledStage width={width} height={height}>
        <NetworkAxes
          offset={offset}
          length={length}
          minX={minX}
          minY={minY}
          scale={scale}
          theme={theme}
        />
        <NetworkNodesAndLines
          modNodes={modNodes}
          lines={lines}
          loads={loads}
          pvs={pvs}
          flows={flows}
          diagramState={diagrams}
          theme={theme}
        />
      </StyledStage>
    </AppPanel>
  );
}

const StyledStage = styled(Stage)`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;
