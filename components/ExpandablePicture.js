import React, { useContext, useMemo } from "react";
import Close from "@carbon/icons-react/lib/close/32";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
import styled, { css, ThemeContext } from "styled-components";
import Button from "./Button";
import PictureContentful from "./PictureContentful";

const Backdrop = styled(DialogBackdrop)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backdrop};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;

  transition: opacity 200ms ${({ theme }) => theme.animation.hover};
  opacity: 0;

  &[data-enter] {
    opacity: 1;
  }
`;

const CloseButton = styled(Button)`
  line-height: 1;
  padding: calc(${({ theme }) => theme.padding} / 4);
  position: absolute;
  right: calc(${({ theme }) => theme.padding} / 4);
  top: calc(${({ theme }) => theme.padding} / 4);
`;

const Modal = styled(Dialog)`
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: calc(${({ theme }) => theme.padding} / 2);
  display: flex;
  flex-direction: column;
  margin: auto calc(${({ theme }) => theme.padding} / 2);
  max-width: ${({ theme }) => theme.breakpoints.max};
  overflow: hidden;
  position: relative;

  figure {
    margin: 0;
    max-width: 100%;
  }

  figcaption {
    margin: auto;
    max-width: ${({ theme }) => theme.maxWidth};
    padding: calc(${({ theme }) => theme.padding} / 2);
  }

  img {
    max-height: 75vh;
    max-width: 100%;
    object-fit: contain;
  }
`;

const PictureButton = styled(DialogDisclosure)`
  border: none;
  border-radius: calc(${({ theme }) => theme.padding} / 2);
  box-shadow: 10px 10px 30px #d2d5d9, -10px -10px 30px #ffffff;
  overflow: hidden;
  padding: 0;
  transition: transform 300ms ${({ theme }) => theme.animation.hover};

  :focus,
  :hover {
    transform: scale(1.03);
  }

  :active {
    transform: scale(0.98);
  }
`;

const PictureSection = styled.figure`
  margin: ${({ theme }) => theme.padding} 0;
`;

export default function ExpandablePicture({
  alt,
  caption,
  height,
  path,
  width,
}) {
  const themeContext = useContext(ThemeContext);
  const dialog = useDialogState({ animated: true });
  const maxBreakpoint = useMemo(
    () => parseFloat(themeContext.breakpoints.max.split("rem")[0]) * 16,
    [themeContext.breakpoints.max]
  );
  const maxWidth = useMemo(
    () =>
      Math.ceil(parseFloat(themeContext.maxWidth.split("rem")[0]) * 16 * 1.5),
    [themeContext.breakpoints.max]
  );

  return (
    <>
      <PictureSection>
        <PictureButton aria-label="Expand image" {...dialog}>
          <PictureContentful
            alt={alt}
            path={path}
            sizes={[{ screen: 1, size: maxWidth }]}
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
            <PictureContentful
              alt={alt}
              height={height}
              path={path}
              sizes={[{ screen: 1, size: maxBreakpoint }]}
              style={{
                height: "auto",
                margin: "auto",
                marginTop: "-1px",
                width: "auto",
              }}
              width={width}
            />
            {caption ? <figcaption>{caption}</figcaption> : null}
          </figure>
        </Modal>
      </Backdrop>
    </>
  );
}
