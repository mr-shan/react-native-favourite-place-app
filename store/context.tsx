import { createContext, ReactNode, useState } from 'react';

import { IPost } from '../types/post';

export const AppContext = createContext({
  favoritePlaces: [] as IPost[],
  addNewPlace: (payload: IPost) => {}
});

export default ({ children } : {children: ReactNode }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([
    {
      id: 'place-1',
      coordinates: { latitude: 0, longitude: 0 },
      locationSnapShot: 'https://cdn.appuals.com/wp-content/uploads/2022/04/google-maps-pin.png',
      image: 'https://i.pinimg.com/originals/50/2c/1c/502c1c5f90972c54b20d979fab1b15c5.jpg',
      location: 'Somewhere across galaxy',
      name: 'A hut in mountain',
    },
    {
      id: 'place-2',
      coordinates: { latitude: 0, longitude: 0 },
      locationSnapShot: 'https://cdn.appuals.com/wp-content/uploads/2022/04/google-maps-pin.png',
      image: 'https://melissaivy.com/wp-content/uploads/2021/01/PHXTCPR_DPOVDiningRoom1_hero-1128x909-1.jpg',
      location: 'Over the hills',
      name: 'A nature trail meal',
    },
  ] as IPost[]);

  const addNewPlace = (payload: IPost) => {
    setFavoritePlaces((oldPlaces: IPost[]) => [...oldPlaces, payload])
  }

  return (
    <AppContext.Provider value={{ favoritePlaces, addNewPlace}}>
      {children}
    </AppContext.Provider>
  )
}