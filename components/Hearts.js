import React, { useEffect, useState } from "react";
import Favorite from "@carbon/icons-react/lib/favorite/32";
import FavoriteFilled from "@carbon/icons-react/lib/favorite--filled/32";
import { motion } from "framer-motion";
import { useDebounce } from "react-use";
import styled from "styled-components";
import {
  Tooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from "reakit/Tooltip";

function intToString(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.padding};
  }
`;

const Floater = styled(motion.div)`
  pointer-events: none;

  svg {
    fill: ${({ theme }) => theme.colors.link};
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  display: flex;
  margin-right: 0.25rem;
  padding: 0;

  svg {
    filter: drop-shadow(0px 0px 0.15rem ${({ theme }) => theme.colors.link});
  }

  path {
    fill: ${({ theme }) => theme.colors.link};
  }

  :focus,
  :hover {
    path {
      fill: ${({ theme }) => theme.colors.link};
    }
  }

  :active {
    path {
      fill: ${({ theme }) => theme.colors.linkActive};
    }
  }

  :disabled {
    cursor: not-allowed !important;

    path {
      fill: ${({ theme }) => theme.colors.font};
    }
  }
`;

const Skeleton = styled.div`
  background: ${({ theme }) => theme.colors.backdrop};
  border-radius: 0.1rem;
  height: ${({ theme }) => theme.type.a.size};
  width: 1rem;
`;

const TooltipArrowStyled = styled(TooltipArrow)`
  fill: ${({ theme }) => theme.colors.font};
`;

const TooltipStyled = styled(TooltipReference)`
  background: ${({ theme }) => theme.colors.font};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.type.small.size};
  line-height: ${({ theme }) => theme.type.small.line};
  max-width: 15rem;
  opacity: 0;
  padding: 0.25rem 0.5rem;
  transform: translate3d(0, -0.5rem, 0);
  transform-origin: top center;
  transition: opacity 200ms ${({ theme }) => theme.animation.hover},
    transform 200ms ${({ theme }) => theme.animation.hover};
  z-index: 2;

  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const MAX_HEARTS = 10;

export default function Hearts({ slug }) {
  const key = `heart--${slug}`;
  const [count, setCount] = useState(0);
  const [hearted, setHearted] = useState();
  const [hearts, setHearts] = useState([]);
  const [existingHearts, setExistingHearts] = useState(null);
  const tooltip = useTooltipState({
    animated: true,
    baseId: "heart",
    placement: "bottom",
  });

  useEffect(() => {
    async function fetchHearts() {
      setCount(0);
      setHearts([]);
      setHearted(localStorage.getItem(key));
      const response = await fetch(`/api/hearts?slug=${slug}`);

      if (response.ok) {
        const { hearts } = await response.json();
        setExistingHearts(hearts);
      }
    }
    fetchHearts();
  }, [slug]);

  useDebounce(
    async () => {
      if (count > 0) {
        await fetch("/api/heart", {
          body: JSON.stringify({ count, slug }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
      }
    },
    2000,
    [count]
  );

  const addHeart = () => {
    const xVariant = (Math.random() - 0.5) * 100;

    setHearts((hearts) => [
      ...hearts,
      {
        id: xVariant,
        x: [
          "0%",
          `${xVariant}%`,
          `${2 * xVariant}%`,
          `${3 * xVariant}%`,
          `${4 * xVariant}%`,
          `${5 * xVariant}%`,
        ],
      },
    ]);
    setCount((count) => count + 1);
    if (!hearted) {
      setHearted(true);
      localStorage.setItem(key, true);
    }

    setTimeout(() => {
      setHearts((hearts) => hearts.slice(1));
    }, 2000);
  };

  return (
    <Container>
      <TooltipReference
        aria-label="Heart this post"
        as={HeartButton}
        disabled={count >= MAX_HEARTS}
        onClick={addHeart}
        type="button"
        {...tooltip}
      >
        {hearted ? <FavoriteFilled /> : <Favorite />}
        {hearts.map(({ id, x }) => (
          <Floater
            animate={{
              opacity: [1, 1, 1, 0.75, 0.5, 0],
              scale: [1, 1, 0.75, 0.5, 0.25, 0],
              x,
              y: ["0%", "-100%", "-200%", "-300%", "-400%", "-500%"],
            }}
            key={id}
            style={{ position: "absolute" }}
          >
            <FavoriteFilled />
          </Floater>
        ))}
      </TooltipReference>
      {existingHearts !== null ? (
        intToString(existingHearts + count)
      ) : (
        <Skeleton />
      )}
      <Tooltip {...tooltip}>
        <TooltipStyled>
          <TooltipArrowStyled {...tooltip} size={24} />
          {count >= MAX_HEARTS
            ? "Okay, that's enough hearts for you."
            : "I appreciate hearts! Why not also share this with your friends?"}
        </TooltipStyled>
      </Tooltip>
    </Container>
  );
}
