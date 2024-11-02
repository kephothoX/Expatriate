import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideAnimationsAsync(), 
    provideAnimationsAsync()
  ]
};

//ey7bkkYE1tGi8oUJb-9h0DK44vfsYbVjf-7pTZ1WAD4IOctu4SuF-ng-Ss6BsgvoJ5WSaELm1xJPnwgJ1P3otEbppe1YygVAkM57fRIzVYtN8zg_3TgOjp_RmS4gqaopNhflOWoL1M0D-O4-hWWP9K4yjzmgxZZqA_lw3R4qQr3vXX6yGRtBWPiqPPNtWXanA-rzp0N2uTDUjOZI6eJw96KutWvQFJEH6LRxUMGD1k1aFZJbdzMoodsqQ-HTyaS-LhgrKHaUZtEuLH8P8x6Y_KBrRNvjantYuL9Lp_ui-1eAHZftbT4GUV5P27IUwvE3yHxkW61KkEFAT3pKpZm7EQ