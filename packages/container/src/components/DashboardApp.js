import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';
export default () => {
    const ref = useRef(null);
    
    // Use the useEffect hook to make sure the code gets executed only one time
    // when the component if first displayed (by providing an empty dependency list)
    useEffect(() => {
      mount(ref.current);  
    }, []);

    return <div ref={ref} />
}