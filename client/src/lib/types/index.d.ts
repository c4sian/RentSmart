type LoginResponse = {
    accessToken: string
    accessTokenExpiration: Date
    userId: string
    displayName: string
    email: string
    roles: string[]
};

type AccommodationShortData = {
    id: string
    title: string
    mainImageUrl: string
    city: string
    street: string
    type: string
    pricePerNight: number
    averageRating: number
};

type PagedResponse = {
    accommodations: AccommodationShortData[]
    totalCount: number
};

type AccommodationFullData = {
    id: string
    title: string
    description: string
    mainImageUrl: string
    country: string
    stateOrCounty?: string
    city: string
    street: string
    latitude: number
    longitude: number
    type: string
    guestsNumber: number
    pricePerNight: number
    checkIn: string
    checkOut: string
    images: Image[]
    amenityIds: number[]
    ownerId: string
    averageRating: number
    reviewsCount: number
    isFavorite: boolean
    dateCreated: Date
};

type Image = {
    id: string
    url: string
    orderIndex: number
};

type BookedDates = {
    checkInDate: Date
    checkOutDate: Date
};

type AccommodationReview = {
    id: string
    rating: number
    comment: string
    createdAt: Date
    reviewer: ReviewerDetails
};

type ReviewEligibility = {
    canReview: boolean
    bookingId: string
};

type UserProfile = {
    userId: string
    displayName: string
    email: string
    listedAccommodations: Accommodation[]
};

type OwnerDetails = {
    displayName: string
    imageUrl?: string
    email: string
};

type ReviewerDetails = {
    id: string
    displayName: string
    imageUrl?: string
}