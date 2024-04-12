export interface ILocation {
  latitude: number
  longitude: number
}

export interface IPost {
  id: string
  name: string
  image: string
  location: string
  coordinates: ILocation
  locationSnapShot: string
}