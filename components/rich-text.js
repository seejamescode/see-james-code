import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styled from "styled-components";
import Anchor from "./anchor";
import ExpandablePicture from "./expandable-picture";
import Video from "./video";

const CodeSandbox = styled.div`
  border-radius: calc(${({ theme }) => theme.padding} / 2);
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  margin-bottom: ${({ theme }) => theme.padding};
  margin-top: ${({ theme }) => theme.padding};
  overflow: hidden;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  position: relative;
  width: 100%;

  iframe {
    border: none;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  /* Prevents grid blowout: https://css-tricks.com/preventing-a-grid-blowout/ */
  min-width: 0;
  position: relative;

  /* Just covering alignment on first and last rich text */
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }

  p,
  ul {
    font-size: ${({ theme }) => theme.type.a.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.a.line};
    max-width: ${({ theme }) => theme.maxWidth};
  }

  h1,
  h2,
  h3,
  h4 {
    max-width: ${({ theme }) => theme.maxWidthHeader};
  }

  h1 {
    font-size: ${({ theme }) => theme.type.c.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.c.line};
    margin-top: ${({ theme }) => theme.padding.xl};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.type.d.size};
      line-height: ${({ theme }) => theme.type.d.line};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.type.b.size};
    font-weight: 300;
    line-height: ${({ theme }) => theme.type.b.line};
    margin-top: ${({ theme }) => theme.padding.lg};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.type.c.size};
      line-height: ${({ theme }) => theme.type.c.line};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.type.c.size};
    line-height: ${({ theme }) => theme.type.c.line};
  }
`;

const sharedBlocks = {
  [INLINES.ENTRY_HYPERLINK]: (node) => (
    <Link as={`/${node.data.target.fields.slug}`} href="/[slug]" passHref>
      <Anchor>{node.content[0].value}</Anchor>
    </Link>
  ),
  [INLINES.HYPERLINK]: (node) => {
    const isSectionLink = !node.data.uri.includes("http");

    return (
      <Anchor
        href={node.data.uri}
        rel={!isSectionLink ? "noopener noreferrer" : ""}
        target={!isSectionLink ? "_blank" : ""}
      >
        {node.content[0].value}
      </Anchor>
    );
  },
};

export default function PostBody({ content }) {
  return (
    <Section>
      {documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return (
              <ExpandablePicture
                alt={node.data.target.fields.title}
                caption={node.data.target.fields.description}
                height={node.data.target.fields.file.details.image.height}
                path={`https:${node.data.target.fields.file.url}`}
                width={node.data.target.fields.file.details.image.width}
              />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const entryType = node.data.target.sys.contentType.sys.id;

            if (entryType === "codeSandbox") {
              return (
                <CodeSandbox>
                  <iframe
                    src={node.data.target.fields.url}
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    title={node.data.target.fields.title}
                  />
                </CodeSandbox>
              );
            }

            if (entryType === "video") {
              return <Video url={node.data.target.fields.url} />;
            }

            return null;
          },
          ...sharedBlocks,
        },
        renderMark: {
          [MARKS.CODE]: (text) => (
            <SyntaxHighlighter style={docco}>{text}</SyntaxHighlighter>
          ),
        },
      })}
    </Section>
  );
}
