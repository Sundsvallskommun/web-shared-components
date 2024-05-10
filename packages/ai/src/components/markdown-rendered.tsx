import { Link } from "@sk-web-gui/link";
import React from "react";
import Markdown, {Options} from "react-markdown";
import sanitized from "../services/sanitizer-service";


interface MarkdownRenderedProps extends React.ComponentPropsWithoutRef<'div'> {
    text: string;
    tabbable?: boolean;
    loading?:boolean;
    disallowedElements: Options['disallowedElements'],
    components: Options['components'],
    /**
     * If the component should have aria-live feedback
     * @default true
     */
    live?: boolean;
}

export const MarkdownRendered = React.forwardRef<HTMLDivElement, MarkdownRenderedProps>((props, ref) => {
 const { text, tabbable = true, loading, disallowedElements, components, live =true, ...rest } = props;

    return (   
    <div aria-live={live ? "polite" : undefined} aria-busy={loading} ref={ref} {...rest}>

  <Markdown
    disallowedElements={disallowedElements || ["script", "iframe"]}
    components={{
        p(props: React.ComponentPropsWithoutRef<'p'>) {
            return <p className="my-md">{props.children}</p>;
        },
        a(props: React.ComponentPropsWithoutRef<'a'>) {
            const { href } = props;
            return (
                <Link
                tabIndex={tabbable ? 0 : -1}
                external={href && href.startsWith("http")}
                href={href}
                className="my-sm"
                >
            {props.children || props.href}
          </Link>
        );
    },
    ol(props: React.ComponentPropsWithoutRef<'ol'>) {
        return <ol className="list-decimal ml-24">{props.children}</ol>;
    },
    ul(props: React.ComponentPropsWithoutRef<'ul'>) {
        return <ul className="list-disc ml-24">{props.children}</ul>;
    },
    li(props: React.ComponentPropsWithoutRef<'li'>) {
        return <li className="my-md">{props.children}</li>;
    },
    ...components
}}
>
    {sanitized(text)}
  </Markdown>
     </div>
    )
});
