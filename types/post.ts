export interface ILocation {
  latitude: string
  longitude: string
}

export interface IPost {
  id: string
  name: string
  image: string
  location: string,
  coordinates: ILocation
}