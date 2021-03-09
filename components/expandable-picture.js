import React from "react";
import Image from "next/image";
import Close from "@carbon/icons-react/lib/close/32";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
import styled from "styled-components";
import Button from "./button";

const Backdrop = styled(DialogBackdrop)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backdrop};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  transition: opacity 200ms ${({ theme }) => theme.animation.hover};
  width: 100%;
  z-index: 3;

  &[data-enter] {
    opacity: 1;
  }
`;

const CloseButton = styled(Button)`
  background: none;
  box-shadow: none;
  height: ${({ theme }) => theme.padding.md};
  line-height: 1;
  padding: 0;
  position: absolute;
  right: ${({ theme }) => theme.padding.xs};
  top: ${({ theme }) => theme.padding.xs};
  width: ${({ theme }) => theme.padding.md};
  z-index: 1;

  :focus,
  :hover {
    background: none;
  }

  :focus {
    box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.focus};
  }
`;

const Modal = styled(Dialog)`
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.padding.sm};
  display: flex;
  flex-direction: column;
  margin: auto ${({ theme }) => theme.padding.sm};
  max-width: ${({ theme }) => theme.breakpoints.max};
  overflow: hidden;
  position: relative;
  width: 100%;

  figure {
    margin: 0;
    max-width: 100%;
    width: 100%;
  }

  figcaption {
    margin: auto;
    max-width: ${({ theme }) => theme.maxWidth};
    padding: ${({ theme }) => theme.padding.sm};
  }

  img {
    max-height: 75vh;
    max-width: 100%;
    object-fit: contain;
  }
`;

const PictureButton = styled(DialogDisclosure)`
  border: none;
  border-radius: ${({ theme }) => theme.padding.sm};
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  overflow: hidden;
  padding: 0;
  transition: box-shadow 300ms ${({ theme }) => theme.animation.hover},
    transform 300ms ${({ theme }) => theme.animation.hover};
  width: 100%;

  :after {
    border-radius: ${({ theme }) => theme.padding.sm};
    content: "";
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  :focus,
  :hover {
    box-shadow: ${({ theme }) => theme.colors.backgroundShadowHover};
    transform: scale(1.02);
  }

  :focus {
    box-shadow: ${({ theme }) =>
      `inset 0px 0px 0px 3px ${theme.colors.focus}, ${theme.colors.backgroundShadow}`};
    outline: none;

    :after {
      box-shadow: ${({ theme }) =>
        `inset 0px 0px 0px 3px ${theme.colors.focus}`};
    }
  }

  :active {
    box-shadow: none;
    transform: scale(0.98);
  }
`;

const PictureSection = styled.figure`
  margin: ${({ theme }) => theme.padding.md} 0;
`;

export default function ExpandablePicture({
  alt,
  caption,
  height,
  path,
  width,
}) {
  const dialog = useDialogState({ animated: true });

  return (
    <>
      <PictureSection>
        <PictureButton aria-label="Expand image" {...dialog}>
          <Image
            layout="responsive"
            alt={alt}
            height={height}
            src={path}
            width={width}
          />
        </PictureButton>
        <figcaption>
          <small>{caption}</small>
        </figcaption>
      </PictureSection>
      <Backdrop {...dialog}>
        <Modal {...dialog} aria-label="Welcome">
          <CloseButton aria-label="Close image modal" onClick={dialog.hide}>
            <Close />
          </CloseButton>
          <figure>
            <Image
              layout="responsive"
              alt={alt}
              height={height}
              src={path}
              width={width}
            />
            {caption ? <figcaption>{caption}</figcaption> : null}
          </figure>
        </Modal>
      </Backdrop>
    </>
  );
}
