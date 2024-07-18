using RMF.Models;

namespace RMF.Services
{
    public interface IRoomMateFinderManager
    {
        public Task<RoomDetails> CreateRoomDetailsAsync(RoomDetails roomDetails);
        public void CreateMultipleRoomsAtOnceAsync(int requiredRooms);
        public Task<IEnumerable<RoomDetails>> GetLimitRoomDetailsAsync(int skip, int limit);
    }
}
