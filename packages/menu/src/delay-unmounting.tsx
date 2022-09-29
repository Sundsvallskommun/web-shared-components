// import React from "react";

import { useEffect, useState } from "react";

// type DelayUnmountingProps = {
//     isMounted: boolean;
//     delayTime: number;
//     [x:string]: any; // Any other prop needed
// }

// type DelayUnmountingState = {
//     shouldRender: boolean;
// }

// function useUnmountDelay(Component: Function) {
//     return class extends React.Component<DelayUnmountingProps, DelayUnmountingState> {
//         state = {
//             shouldRender: this.props.isMounted
//         };

//         componentDidUpdate(prevProps: DelayUnmountingProps) {
//             // Nothing is happening
//             console.log('prevProps', prevProps)
//             console.log('props', this.props)

//             if (prevProps.isMounted && !this.props.isMounted) {
//                 setTimeout(() => {
//                     this.setState({ shouldRender: false })
//                     console.log('delayed')
//                 },
//                 this.props.delayTime
//                 );
//             } else if (!prevProps.isMounted && this.props.isMounted) {
//                 this.setState({ shouldRender: true });
//             }
//         }

//         render() {
//             return (
//                 <>
//                     {console.log(this.props)}
//                     {this.state.shouldRender ? <Component {...this.props} /> : null}
//                 </>
//             )
//         }
//     };
// }

// export default useUnmountDelay


export default function useUnmountDelay(isMounted: boolean, delayTime: number) {
    const [shouldRender, setShouldRender] = useState(false);
  
    useEffect(() => {
      let timeoutId: ReturnType<typeof setTimeout>
      if (isMounted && !shouldRender) {
        setShouldRender(true);
      } else if (!isMounted && shouldRender) {
        timeoutId = setTimeout(() => setShouldRender(false), delayTime);
      }
      return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);
    return shouldRender;
  }