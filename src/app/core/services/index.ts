import { ContextMenuService } from './context-menu/context-menu.service';
import { DeviceScreenSizeService } from './device-screen-size/device-screen-size.service';
import { DialogService } from './dialog-service/dialog.service';
import { RememberMeService } from './remember-me/remember-me.service';
import { ErrorHandlerMessageService } from './error-handler-message/error-handler-message.service';
import { RestService } from './rest-service/rest.service';

export * from './context-menu/context-menu.service';
export * from './device-screen-size/device-screen-size.service';
export * from './dialog-service/dialog.service';
export * from './remember-me/remember-me.service';
export * from './error-handler-message/error-handler-message.service';
export * from './rest-service/rest.service';

export const services = [
    ContextMenuService,
    DeviceScreenSizeService,
    DialogService,
    RememberMeService,
    ErrorHandlerMessageService,
    RestService
];
