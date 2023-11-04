import { useEffect } from 'react';
import { useDocumentVisibility } from '../lib/useDocumentVisibility.js';
import { useMediaQuery } from '../lib/useMediaQuery.js';
import { MediaQuery } from '../UI/MediaQuery.jsx';

export const App = () => {
  return (
    <div className="bg-amber-400 h-full p-5">
      <div className="bee mx-auto"></div>
      <div className="container text-zinc-800 text-x2 py-10">
        <DocumentVisibility />
        <div className="mb-10"></div>
        <MediaQueryHook />
        <div className="mb-10"></div>
        <MediaQueryComponent />
      </div>
    </div>
  );
};

const DocumentVisibility = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  // Не изменяйте этот useEffect, он используется в тестах
  useEffect(() => {
    onVisibilityChange(isVisible => {
      console.log(`first handler ${isVisible}`);
    });

    const unsubscribeSecondHandler = onVisibilityChange(isVisible => {
      console.log(`second handler ${isVisible}`);
    });

    setTimeout(() => unsubscribeSecondHandler(), 2000); // отписываемся от 'second handler' через 3 секунды
  }, []);

  return (
    <div className="text-center">
      <div className="mb-2">
        Вы покинули страницу: <span data-test="leaveCount">{count}</span> раз
      </div>
      <div>
        Вкладка активна? <span data-test="isTabActive">{visible ? 'да' : 'нет'}</span>
      </div>
    </div>
  );
};

const MediaQueryHook = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <div className="text-center">
      <h1>Device Test!</h1>

      {isDesktopOrLaptop && <p data-test="isDesktop">You are at desktop or laptop</p>}

      {isBigScreen && <p data-test="isBigScreen">You have a huge screen</p>}

      {isTabletOrMobile && <p data-test="isTablet">You are at tablet or mobile phone</p>}

      <p>
        Your are using <span data-test="orientation">{isPortrait ? 'portrait' : 'landscape'}</span>{' '}
        orientation
      </p>

      {isRetina && <p data-test="isRetina">You have retina display</p>}
    </div>
  );
};

const MediaQueryComponent = () => (
  <div className="text-center">
    <h1>Device Test!</h1>
    <MediaQuery minWidth={1224}>
      <p data-test="isDesktop">You are a desktop or laptop</p>
      <MediaQuery minWidth={1824}>
        <p data-test="isBigScreen">You also have a huge screen</p>
      </MediaQuery>
    </MediaQuery>

    <MediaQuery maxWidth={800}>
      {matches =>
        matches ? (
          <p>You are at mobile phone</p>
        ) : (
          <p data-test="isNotMobile">You are not at mobile phone</p>
        )
      }
    </MediaQuery>

    <MediaQuery minResolution="2dppx">
      {/* @media (-webkit-min-device-pixel-ratio: 2) */}
      {/* You can also use a function (render prop) as a child */}
      {matches => (matches ? <p>You have retina display</p> : <p>You don't have retina</p>)}
    </MediaQuery>
  </div>
);
