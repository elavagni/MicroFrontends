import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    // Use the useEffect hook to make sure the code gets executed only one time
    // when the component if first displayed (by providing an empty dependency list)
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname, 
            //Sync container browser history with values from Marketing Memory History (url paths)
            //destruct and rename variable 
            onNavigate: ({ pathname: nextPathname }) => {
               const { pathname }  = history.location;

               //Only navigate is the two paths are different, if they are the same and we perform
               //the navidation, it would lead to an infinive loop (circular navigation)
               if (pathname !== nextPathname) {
                   history.push(nextPathname);  
               }               
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
}