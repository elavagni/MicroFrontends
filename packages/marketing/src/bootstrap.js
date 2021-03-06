import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';


//Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    //defaultHistory is only provided if we are running in dev in isolation
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }   

    ReactDOM.render(<App history={history} />, el);   

    return  {
        //return this function when mount is called, so that the container can
        //notify the MarketingApp when navigation occurs (propagate event down)
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            
            if(pathname !== nextPathname) {
                history.push(location);
            }            
        },
    };
};

//If we are in development and in isolation, 
//call mount inmediately 
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

//We are running through container
//and we should export the mount function
export { mount };
