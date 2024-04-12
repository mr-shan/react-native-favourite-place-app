import { createContext, ReactNode, useState } from 'react';

import { IPost } from '../types/post';

export const AppContext = createContext({
  favoritePlaces: [] as IPost[],
  addNewPlace: (payload: IPost) => {}
});

export default ({ children } : {children: ReactNode }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([] as IPost[]);

  const addNewPlace = (payload: IPost) => {
    setFavoritePlaces((oldPlaces: IPost[]) => [...oldPlaces, payload])
  }

  return (
    <AppContext.Provider value={{ favoritePlaces, addNewPlace}}>
      {children}
    </AppContext.Provider>
  )
}