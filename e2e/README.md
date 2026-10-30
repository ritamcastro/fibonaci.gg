# Browser direction tests

Install the frontend dependencies with `npm ci --prefix frontend` from the
repository root. Then, from `e2e/`, install the test dependencies and browser
engines once:

```sh
npm ci
npx playwright install chromium webkit
```

Run all 16 direction checks (four directions in each configuration):

```sh
npm test
```

The suite starts Vite automatically at http://127.0.0.1:4173.
It uses the real New Game button and fixes randomness to make tile placement
repeatable. Assertions check that both initial tiles reach the intended edge,
so a newly spawned tile cannot conceal a reversed move.

| Project | Browser engine | Input |
| --- | --- | --- |
| `desktop-chrome` | Chromium | Arrow keys |
| `desktop-safari` | WebKit | Arrow keys |
| `iphone` | WebKit, iPhone 13 emulation | Synthetic touch swipes |
| `pixel` | Chromium, Pixel 7 emulation | Synthetic touch swipes |

Run one configuration, or show browser windows:

```sh
npm test -- --project=iphone
npm run test:headed
```

Failures retain traces under `test-results/`. Open one with:

```sh
npx playwright show-trace test-results/<failed-test>/trace.zip
```

These tests run desktop browser engines with mobile device profiles; they do
not run iOS or Android, and do not verify physical touchscreen handling or
native browser gesture arbitration. Swipes use synthetic legacy touch events
as described in https://playwright.dev/docs/touch-events. Physical iPhone and
Pixel coverage requires devices or a real-device testing service and its own
automation connection.
