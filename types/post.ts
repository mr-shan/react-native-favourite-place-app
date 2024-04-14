export interface ILocation {
  latitude: number
  longitude: number
}

export interface IPost {
  id: number
  name: string
  image: string
  location: string
  coordinates: ILocation
  locationSnapShot: string
}