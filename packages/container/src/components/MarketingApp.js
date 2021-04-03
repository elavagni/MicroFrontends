import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    // Use the useEffect hook to make sure the code gets executed only one time
    // when the component if first displayed (by providing an empty dependency list)
    useEffect(() => {        
        //Call the mount function from MarketingApp, and pass an options object as the second argument
        const { onParentNavigate } = mount(ref.current, {  
            //the onNavigate callback will give us the navigation object, we just need the pathname, so we can 
            //deconstruct and rename the property to nextPathname          
            onNavigate: ({ pathname: nextPathname }) => {
                //When onNavigate is called we will sync the container browser history with values from Marketing Memory History (url paths)
                //(propage navigation event up)
                const { pathname }  = history.location;

               //Only navigate if the two paths are different, if they are the same and we perform
               //the navidation, it would lead to an infinive loop (circular navigation)
               if (pathname !== nextPathname) {
                   //navigate to path
                   history.push(nextPathname);  
               }               
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
}