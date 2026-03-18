import 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams:
        | { pathname: import('expo-router').RelativePathString; params?: import('expo-router').UnknownInputParams }
        | { pathname: import('expo-router').ExternalPathString; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/_sitemap`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}` | `/`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/history` | `/history`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/settings` | `/settings`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/devotional`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/journal`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/premium`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/reflect`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/share`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/topics`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/+not-found`; params: import('expo-router').UnknownInputParams & {} };
      hrefOutputParams:
        | { pathname: import('expo-router').RelativePathString; params?: import('expo-router').UnknownOutputParams }
        | { pathname: import('expo-router').ExternalPathString; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/_sitemap`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `${'/(tabs)'}` | `/`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `${'/(tabs)'}/history` | `/history`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `${'/(tabs)'}/settings` | `/settings`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/devotional`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/journal`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/premium`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/reflect`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/share`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/topics`; params?: import('expo-router').UnknownOutputParams }
        | { pathname: `/+not-found`; params: import('expo-router').UnknownOutputParams & {} };
      href:
        | import('expo-router').RelativePathString
        | import('expo-router').ExternalPathString
        | `/_sitemap${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}`
        | `/${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}/favorites${`?${string}` | `#${string}` | ''}`
        | `/favorites${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}/history${`?${string}` | `#${string}` | ''}`
        | `/history${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}/settings${`?${string}` | `#${string}` | ''}`
        | `/settings${`?${string}` | `#${string}` | ''}`
        | `/devotional${`?${string}` | `#${string}` | ''}`
        | `/journal${`?${string}` | `#${string}` | ''}`
        | `/premium${`?${string}` | `#${string}` | ''}`
        | `/reflect${`?${string}` | `#${string}` | ''}`
        | `/share${`?${string}` | `#${string}` | ''}`
        | `/topics${`?${string}` | `#${string}` | ''}`
        | { pathname: import('expo-router').RelativePathString; params?: import('expo-router').UnknownInputParams }
        | { pathname: import('expo-router').ExternalPathString; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/_sitemap`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}` | `/`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/history` | `/history`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `${'/(tabs)'}/settings` | `/settings`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/devotional`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/journal`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/premium`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/reflect`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/share`; params?: import('expo-router').UnknownInputParams }
        | { pathname: `/topics`; params?: import('expo-router').UnknownInputParams }
        | `/+not-found${`?${string}` | `#${string}` | ''}`
        | { pathname: `/+not-found`; params: import('expo-router').UnknownInputParams & {} };
    }
  }
}
