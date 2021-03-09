import React from "react";
import FavoriteFilled from "@carbon/icons-react/lib/favorite--filled/32";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Floater = styled(motion.div)`
  pointer-events: none;
  position: absolute;

  svg {
    fill: ${({ theme }) => theme.colors.link};
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default function HeartFloaters({ hearts }) {
  return (
    <AnimatePresence initial={false}>
      {hearts.map(({ id, x }) => (
        <Floater
          initial={{ opacity: 1, scale: 1, x: "0%", y: "0%" }}
          animate={{
            opacity: 0,
            scale: [1, 1, 0.75, 0.5, 0.25, 0],
            x,
            y: ["0%", "-100%", "-200%", "-300%", "-400%", "-500%"],
          }}
          key={`heart-floater-${id}`}
          positionTransition
        >
          <FavoriteFilled />
        </Floater>
      ))}
    </AnimatePresence>
  );
}
