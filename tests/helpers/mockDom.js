import 'jsdom-global/register';
import injectTapEventPlugin from 'react-tap-event-plugin';

let injected = false;
if (!injected) {
    injectTapEventPlugin();
    injected = true;
}
