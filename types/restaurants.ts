export interface restaurantTypes  {
    name:string,
    seats: number,
    image : string,
    adress : string,
    opening : string,
    closing : string
} 



export interface carouselImageTypes {
    images : string[],
    res_id : string
}

export interface slotTypes {
    ref_id : string,
    slog : string[]
}