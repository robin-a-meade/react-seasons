import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Spinner from "./Spinner";
import SeasonDisplay from "./SeasonDisplay";

if ('geolocation' in navigator) {
  console.log('geolocation is available');
} else {
  console.log('geolocation is NOT available');
}

const App = () => {
  // States
  // 0 - Attempting to retrieve current position
  // 1 - Successfully got current position
  // 2 - Failed to get current position

  const [geoState, setGeoState] = React.useState(
    { state: 0, latitude: null, errCode: null, errMessage: '' }
  );

  // Register a side effect to occur at mount time
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setGeoState({ state: 1, latitude: position.coords.latitude, errCode: null, errMessage: '' });
    }, (err) => {
      console.log(err);
      // {
      //   code: 1, 
      //   PERMISSION_DENIED: 1,
      //   POSITION_UNAVAILABLE: 2,
      //   TIMEOUT: 3,
      //   message: "User denied geolocation prompt"
      // }
      setGeoState(
        {
          state: 2,
          latitude: null,
          errCode: err.code,
          errMessage: err.message
        }
      );
    });
  }, []); // Empty array here means "no dependencies", thus this 
  // side effect will get triggered once (at 
  // componentDidMount time).

  // TODO: Is it advisable to create helper functions within a functional
  // component, or should I move it outside the component? I'm worried that
  // the function is getting redined each time the functional component is
  // rendered.
  const renderContent = () => {
    switch (geoState.state) {
      case 0: // Attempting to retrieve current position
        // NOTE: We gave the Spinner component a default value for 
        // its message property of "Loading...". Here we are
        // overriding that default.
        return <Spinner message="Please accept location request..." />;
        break;
      case 1: // Successfully got current position
        return <SeasonDisplay latitude={geoState.latitude} />;
        break;
      case 2: // Failed to get current position
        // TODO: Make a friendly, attractive error page
        return (
          <>
            <div>Error: Failed to load location.</div>
            <div>Error code: {geoState.errCode}</div>
            <div>Error message: {geoState.errMessage}</div>
          </>
        );
        break;
    }
  };

  return (
    // Here we place a 1px border around the result just to demonstrate 
    // the usefulness of a helper function for encpasulating conditional 
    // rendering. Otherwise, we'd have to duplicate the border for each result!
    // BUG? For some reason, the yellow border isn't visible when the
    // Spinner shows. I'm not sure why. It see it if I inspect the element.
    // UPDATE: The styling that SemanticUI puts on Spinner intentially
    // makes it occupy the entire viewport. Not a bug.
    <div style={{ border: '1px solid yellow' }}>
      {renderContent()}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);