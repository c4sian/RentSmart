type Accommodation = {
    id: string
    title: string
    description: string
    country: string
    stateOrCounty?: string
    city: string
    street: string
    type: string
    guestsNumber: number
    pricePerNight: number
    checkIn: string
    checkOut: string
    ownerId: string
}

type LoginResponse = {
    accessToken: string
    accessTokenExpiration: Date
    userId: string
    displayName: string
    email: string
    imageUrl?: string
    roles: string[]
}

type Image = {
    id: string
    url: string
}