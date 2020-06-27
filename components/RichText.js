import React from "react";
import Link20 from "@carbon/icons-react/lib/link/20";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";
import Highlight from "react-highlight.js";
import Anchor from "./Anchor";
import ExpandablePicture from "./ExpandablePicture";
import Video from "./Video";

const QuickLinkContainer = styled.div`
  display: inline-flex;
`;

const QuickLink = styled(Anchor)`
  display: flex;
  margin-left: calc(${({ theme }) => theme.padding} / 4);

  svg {
    margin: 0;
    transform: none;
  }
`;

const makeHeaderLink = (node) => {
  const link = node.content
    .filter(({ nodeType }) => nodeType === "text")
    .map(({ value }) => value.toLowerCase().split(" ").join("-"))
    .join("-");

  return (
    <div id={link}>
      {documentToReactComponents(
        {
          ...node,
          content: [
            ...node.content,
            {
              content: [],
              data: {
                target: {
                  fields: {
                    link,
                  },
                  sys: {
                    contentType: {
                      sys: {
                        id: "headerLink",
                      },
                    },
                    type: "Entry",
                  },
                },
              },
              marks: [],
              nodeType: "embedded-entry-block",
            },
          ],
        },
        {
          renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
              if (node.data.target.sys.contentType.sys.id === "headerLink") {
                return (
                  <QuickLinkContainer>
                    <QuickLink
                      aria-labelledby={node.data.target.fields.link}
                      href={`#${node.data.target.fields.link}`}
                    >
                      <Link20 />
                    </QuickLink>
                  </QuickLinkContainer>
                );
              }

              return null;
            },
            ...sharedBlocks,
          },
        }
      )}
    </div>
  );
};

const sharedBlocks = {
  [INLINES.HYPERLINK]: (node) => (
    <Anchor href={node.data.uri} rel="noopener noreferrer" target="_blank">
      {node.content[0].value}
    </Anchor>
  ),
};

export default function RichText({ content }) {
  return (
    <>
      {documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return (
              <ExpandablePicture
                alt={node.data.target.fields.title}
                caption={node.data.target.fields.description}
                height={node.data.target.fields.file.details.image.height}
                path={node.data.target.fields.file.url}
                width={node.data.target.fields.file.details.image.width}
              />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            if (node.data.target.sys.contentType.sys.id === "video") {
              return <Video url={node.data.target.fields.url} />;
            }

            return null;
          },
          [BLOCKS.HEADING_1]: makeHeaderLink,
          [BLOCKS.HEADING_2]: makeHeaderLink,
          ...sharedBlocks,
        },
        renderMark: {
          [MARKS.CODE]: (text) => <Highlight>{text}</Highlight>,
        },
      })}
    </>
  );
}
