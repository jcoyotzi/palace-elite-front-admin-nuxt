import { MaxOccupancyByHotelDTO } from "../dto/maxOccupancyByHotelDTO";
import { MaxOccupancyByHotelAndRoomType } from "../entities/maxOccupancyByHotel";

export default class MaxOccupanciesByHotelMapper {

  static map(data: MaxOccupancyByHotelDTO[]): MaxOccupancyByHotelAndRoomType[] {
    return data.map((item: MaxOccupancyByHotelDTO) => {
      return {
        hotel: item.hotel,
        roomType: item.roomType,
        maxOccupancy: item.ocupancyNew
      }
    })
  }
}